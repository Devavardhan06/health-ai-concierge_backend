# app/services/rag_service.py
import os
import re
import math
from collections import Counter
from typing import List, Tuple

# ============================================================================
# CONFIGURATION
# ============================================================================
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
KNOWLEDGE_PATH = os.path.join(BASE_DIR, "knowledge", "clinic_data.txt")

# Retrieval parameters
TOP_K_RESULTS = 5
MIN_SCORE_THRESHOLD = 0.1

# ============================================================================
# VALIDATION
# ============================================================================
if not os.path.exists(KNOWLEDGE_PATH):
    raise RuntimeError(
        f"Knowledge file not found at: {KNOWLEDGE_PATH}\n"
        "Expected path: backend/app/knowledge/clinic_data.txt"
    )

# ============================================================================
# LOAD KNOWLEDGE BASE
# ============================================================================
with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
    full_text = f.read()

# ============================================================================
# TEXT PROCESSING FUNCTIONS
# ============================================================================

def chunk_text(text: str, chunk_size: int = 400) -> List[str]:
    """
    Split text into logical chunks while preserving context.
    
    Strategy:
    - Split by double newlines (section boundaries)
    - Keep related information together
    - Limit chunk size for better retrieval
    """
    chunks = []
    current_chunk = []
    current_size = 0
    
    for line in text.split('\n'):
        line = line.strip()
        
        # Empty line marks potential chunk boundary
        if not line:
            if current_chunk and current_size > 0:
                chunks.append('\n'.join(current_chunk))
                current_chunk = []
                current_size = 0
            continue
        
        line_size = len(line)
        
        # If adding this line exceeds chunk size, save current chunk
        if current_size + line_size > chunk_size and current_chunk:
            chunks.append('\n'.join(current_chunk))
            current_chunk = []
            current_size = 0
        
        current_chunk.append(line)
        current_size += line_size
    
    # Add the last chunk
    if current_chunk:
        chunks.append('\n'.join(current_chunk))
    
    # Filter out empty chunks
    return [chunk for chunk in chunks if chunk.strip()]

def tokenize(text: str) -> List[str]:
    """
    Convert text to lowercase tokens.
    Extracts words only (alphanumeric).
    """
    return re.findall(r'\b\w+\b', text.lower())

def calculate_tf_idf(query_tokens: List[str], 
                     chunk_tokens: List[str], 
                     all_chunks_tokens: List[List[str]]) -> float:
    """
    Calculate TF-IDF score for a chunk given a query.
    
    TF (Term Frequency): How often a query term appears in the chunk
    IDF (Inverse Document Frequency): How rare/important a term is across all chunks
    
    Higher score = more relevant
    """
    if not chunk_tokens:
        return 0.0
    
    chunk_counter = Counter(chunk_tokens)
    tf_idf_scores = []
    
    for token in query_tokens:
        # Term Frequency: proportion of chunk that contains this term
        tf = chunk_counter.get(token, 0) / len(chunk_tokens)
        
        # Inverse Document Frequency: rarity of term across all chunks
        docs_with_token = sum(1 for doc_tokens in all_chunks_tokens if token in doc_tokens)
        idf = math.log(len(all_chunks_tokens) / (1 + docs_with_token))
        
        tf_idf_scores.append(tf * idf)
    
    return sum(tf_idf_scores)

# ============================================================================
# INITIALIZE KNOWLEDGE BASE
# ============================================================================

# Create chunks from knowledge base
KNOWLEDGE_CHUNKS = chunk_text(full_text)

# Pre-tokenize all chunks for faster retrieval
ALL_CHUNKS_TOKENS = [tokenize(chunk) for chunk in KNOWLEDGE_CHUNKS]

# Startup message
print("\n" + "=" * 70)
print("RAG SERVICE INITIALIZED")
print("=" * 70)
print(f"✓ Knowledge base loaded: {KNOWLEDGE_PATH}")
print(f"✓ Total chunks created: {len(KNOWLEDGE_CHUNKS)}")
print(f"✓ Using TF-IDF retrieval algorithm")
print(f"✓ Ready to serve queries")
print("=" * 70 + "\n")

# ============================================================================
# RETRIEVAL FUNCTIONS
# ============================================================================

def retrieve_relevant_knowledge(query: str, top_k: int = TOP_K_RESULTS) -> str:
    """
    Retrieve the most relevant knowledge chunks for a given query.
    
    Algorithm:
    1. Tokenize the query
    2. Calculate TF-IDF scores for all chunks
    3. Apply boost factors for:
       - Exact phrase matches
       - Important domain keywords
    4. Return top-k highest scoring chunks
    
    Args:
        query: User's question/query
        top_k: Number of top chunks to return (default: 5)
    
    Returns:
        Concatenated relevant knowledge chunks separated by double newlines
        Returns "No relevant information found." if no matches
    """
    # Tokenize query
    query_tokens = tokenize(query)
    
    if not query_tokens:
        return "No relevant information found."
    
    # Score each chunk
    scored_chunks = []
    
    for idx, chunk in enumerate(KNOWLEDGE_CHUNKS):
        chunk_tokens = ALL_CHUNKS_TOKENS[idx]
        
        # Base TF-IDF score
        score = calculate_tf_idf(query_tokens, chunk_tokens, ALL_CHUNKS_TOKENS)
        
        # BOOST 1: Exact phrase matching (bigrams)
        # If two consecutive query words appear together in chunk, it's more relevant
        chunk_lower = chunk.lower()
        for i in range(len(query_tokens) - 1):
            phrase = f"{query_tokens[i]} {query_tokens[i+1]}"
            if phrase in chunk_lower:
                score += 2.0  # Strong boost for phrase match
        
        # BOOST 2: Important domain keywords
        # Medical clinic-specific important terms
        important_keywords = [
            # Doctor-related
            'doctor', 'dr', 'physician', 'specialist', 'pediatrician', 
            'cardiologist', 'orthopedic', 'gynecologist',
            
            # Days of the week
            'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 
            'saturday', 'sunday',
            
            # Financial
            'fee', 'fees', 'cost', 'price', 'payment', 'charge',
            
            # Timing
            'timing', 'timings', 'hours', 'time', 'schedule', 'available',
            
            # Services
            'appointment', 'consultation', 'test', 'service', 'diagnostic',
            'emergency', 'vaccination', 'pharmacy',
            
            # Common queries
            'book', 'booking', 'location', 'parking', 'contact'
        ]
        
        for keyword in important_keywords:
            if keyword in query_tokens and keyword in chunk_tokens:
                score += 0.5  # Moderate boost for keyword match
        
        # Only keep chunks with positive scores
        if score > MIN_SCORE_THRESHOLD:
            scored_chunks.append((score, chunk))
    
    # Sort by score (highest first)
    scored_chunks.sort(reverse=True, key=lambda x: x[0])
    
    # Get top-k chunks
    top_chunks = [chunk for score, chunk in scored_chunks[:top_k]]
    
    # Return concatenated results or "not found" message
    if top_chunks:
        return "\n\n".join(top_chunks)
    else:
        return "No relevant information found."

# ============================================================================
# DEBUG AND TESTING UTILITIES
# ============================================================================

def debug_retrieval(query: str, top_k: int = 5) -> None:
    """
    Debug function to see scoring details for a query.
    Useful for understanding why certain chunks are retrieved.
    """
    print("\n" + "=" * 70)
    print(f"DEBUG: Analyzing query - '{query}'")
    print("=" * 70)
    
    query_tokens = tokenize(query)
    print(f"\nQuery tokens: {query_tokens}")
    print(f"Number of tokens: {len(query_tokens)}")
    
    # Score all chunks
    scored_chunks = []
    for idx, chunk in enumerate(KNOWLEDGE_CHUNKS):
        chunk_tokens = ALL_CHUNKS_TOKENS[idx]
        score = calculate_tf_idf(query_tokens, chunk_tokens, ALL_CHUNKS_TOKENS)
        
        # Apply same boosts as main function
        chunk_lower = chunk.lower()
        phrase_boosts = 0
        keyword_boosts = 0
        
        for i in range(len(query_tokens) - 1):
            phrase = f"{query_tokens[i]} {query_tokens[i+1]}"
            if phrase in chunk_lower:
                phrase_boosts += 2.0
        
        important_keywords = [
            'doctor', 'monday', 'tuesday', 'wednesday', 'thursday', 
            'friday', 'saturday', 'sunday', 'fee', 'cost', 'price',
            'timing', 'hours', 'appointment', 'test', 'service'
        ]
        for keyword in important_keywords:
            if keyword in query_tokens and keyword in chunk_tokens:
                keyword_boosts += 0.5
        
        total_score = score + phrase_boosts + keyword_boosts
        
        if total_score > MIN_SCORE_THRESHOLD:
            scored_chunks.append((total_score, score, phrase_boosts, keyword_boosts, idx, chunk))
    
    # Sort by total score
    scored_chunks.sort(reverse=True, key=lambda x: x[0])
    
    # Display top results
    print(f"\n{'='*70}")
    print(f"TOP {min(top_k, len(scored_chunks))} RESULTS:")
    print(f"{'='*70}\n")
    
    for rank, (total, base, phrase, keyword, idx, chunk) in enumerate(scored_chunks[:top_k], 1):
        print(f"RANK {rank} | Chunk #{idx}")
        print(f"  Total Score: {total:.4f}")
        print(f"  - Base TF-IDF: {base:.4f}")
        print(f"  - Phrase Boost: {phrase:.4f}")
        print(f"  - Keyword Boost: {keyword:.4f}")
        print(f"\n  Content Preview:")
        preview = chunk[:200] + "..." if len(chunk) > 200 else chunk
        print(f"  {preview}\n")
        print("-" * 70 + "\n")

def get_statistics() -> dict:
    """Get statistics about the knowledge base."""
    total_tokens = sum(len(tokens) for tokens in ALL_CHUNKS_TOKENS)
    avg_tokens = total_tokens / len(ALL_CHUNKS_TOKENS) if ALL_CHUNKS_TOKENS else 0
    
    return {
        "total_chunks": len(KNOWLEDGE_CHUNKS),
        "total_tokens": total_tokens,
        "avg_tokens_per_chunk": round(avg_tokens, 2),
        "retrieval_method": "TF-IDF",
        "top_k_default": TOP_K_RESULTS,
        "min_score_threshold": MIN_SCORE_THRESHOLD
    }

# ============================================================================
# TESTING
# ============================================================================

if __name__ == "__main__":
    print("\n" + "=" * 70)
    print("TESTING RAG SERVICE")
    print("=" * 70)
    
    # Show statistics
    stats = get_statistics()
    print("\nKnowledge Base Statistics:")
    for key, value in stats.items():
        print(f"  {key}: {value}")
    
    # Test queries
    test_queries = [
        "Which doctors are available on Monday?",
        "What are the consultation fees?",
        "Is ultrasound available?",
        "What are the clinic timings?",
        "Can I book an appointment online?",
        "What diagnostic tests are available?",
        "Do you accept insurance?",
        "Is parking available?",
        "What is the contact number?",
        "Emergency services available?"
    ]
    
    print("\n" + "=" * 70)
    print("RUNNING TEST QUERIES")
    print("=" * 70)
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n[TEST {i}/{len(test_queries)}]")
        print(f"Q: {query}")
        print("-" * 70)
        
        result = retrieve_relevant_knowledge(query, top_k=3)
        
        # Show preview of result
        preview = result[:400] + "..." if len(result) > 400 else result
        print(preview)
        print()
    
    # Run detailed debug on one query
    print("\n" + "=" * 70)
    print("DETAILED DEBUG EXAMPLE")
    print("=" * 70)
    debug_retrieval("Which doctors are available on Monday?", top_k=3)