from datetime import datetime
from app import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, DateTime


class Sale(db.Model):
    __tablename__ = "sales"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), nullable=False)
    discount_id: Mapped[int] = mapped_column(
        ForeignKey("discount.id"), nullable=True)
    total: Mapped[int] = mapped_column(nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    discount = relationship("Discount")
    items = relationship("SaleItem", back_populates="sale",
                         cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "discount": self.discount.serialize() if self.discount else None,
            "total": self.total,
            "date": self.date.isoformat(),
            "items": [item.serialize() for item in self.items]
        }


class SaleItem(db.Model):
    __tablename__ = "sale_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    sale_id: Mapped[int] = mapped_column(
        ForeignKey("sales.id"), nullable=False)
    jewell_id: Mapped[int] = mapped_column(
        ForeignKey("jewells.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)

    sale = relationship("Sale", back_populates="items")
    jewell = relationship("Jewell")

    def serialize(self):
        return {
            "id": self.id,
            "jewell": self.jewell.serialize() if self.jewell else None,
            "quantity": self.quantity
        }
