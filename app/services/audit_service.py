from app.models.audit_log import AuditLog

def log_audit(db, actor: str, action: str, resource: str, details: str = ""):
    log = AuditLog(
        actor=actor,
        action=action,
        resource=resource,
        details=details
    )
    db.add(log)
    db.commit()
