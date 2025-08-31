from . import db
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Discount(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    discount_code: Mapped[str] = mapped_column(String(10), nullable=False)
    total: Mapped[int] = mapped_column(nullable=False)
    start_date: Mapped[int] = mapped_column(nullable=False)
    expiration_date: Mapped[int] = mapped_column(nullable=False)
    active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "discount_code": self.discount_code,
            "total": self.total,
            "start_date": self.start_date,
            "expiration_date": self.expiration_date,
            "active": self.active
        }
