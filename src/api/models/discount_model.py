from . import db
from sqlalchemy import String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone


class Discount(db.Model):
    __tablename__ = "discount"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), nullable=False)
    discount_code: Mapped[str] = mapped_column(String(20), nullable=False)
    total: Mapped[int] = mapped_column(nullable=False)
    start_date: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )
    expiration_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "discount_code": self.discount_code,
            "total": self.total,
            "start_date": self.start_date.replace(tzinfo=timezone.utc).isoformat(),
            "expiration_date": self.expiration_date.replace(tzinfo=timezone.utc).isoformat(),
            "active": self.active
        }
