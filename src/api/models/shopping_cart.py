from typing import List
from app import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey


class ShoppingCart(db.Model):
    __tablename__ = "shoppingcart"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    jewell_id: Mapped[int] = mapped_column(
        ForeignKey("jewells.id"), nullable=False)

    quantity: Mapped[int] = mapped_column(default=1)

    jewell = relationship(
        "Jewell", back_populates="cart_items")

    def add_quantity(self, amount: int = 1):
        self.quantity += amount

    def remove_quantity(self, amount: int = 1):
        self.quantity = max(self.quantity - amount, 0)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "jewell_id": self.jewell_id,
            "quantity": self.quantity,
            "jewell": self.jewell.serialize()
        }
