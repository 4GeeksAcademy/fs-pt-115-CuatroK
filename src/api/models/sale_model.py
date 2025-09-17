from datetime import datetime
from app import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, DateTime


class Sale(db.Model):
    __tablename__ = "sales"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    jewell_id: Mapped[int] = mapped_column(
        ForeignKey("jewells.id"), nullable=False)

    quantity: Mapped[int] = mapped_column(default=1, nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="sales")
    jewell = relationship("Jewell", back_populates="sales")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "jewell_id": self.jewell_id,
            "quantity": self.quantity,
            "date": self.date.isoformat(),
            "user": self.user.serialize() if self.user else None,
            "jewell": self.jewell.serialize() if self.jewell else None,
        }
