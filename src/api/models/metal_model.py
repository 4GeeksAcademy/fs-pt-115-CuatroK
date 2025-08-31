from . import db
from decimal import Decimal
from api.oldmodels import user
from sqlalchemy import String, Boolean, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Metal(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(40), nullable=True)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    unit: Mapped[str] = mapped_column(String(50), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "unit": self.unit
        }


class Metal_transactions(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    total: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    date: Mapped[str] = mapped_column(String(20), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["user"] = relationship("user")

    metal_id: Mapped[int] = mapped_column(ForeignKey("Metal.id"))
    metal: Mapped["Metal"] = relationship("Metal")

    def serialize(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "total": self.total,
            "date": self.date,
            "user": self.user.serialize() if self.user else None,
            "metal": self.metal.serialize() if self.metal else None
        }
