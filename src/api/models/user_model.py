from typing import List, Optional
from . import db
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    gender: Mapped[Optional[str]] = mapped_column(String(10))
    birth_date: Mapped[Optional[str]] = mapped_column(String(20))
    full_name: Mapped[Optional[str]] = mapped_column(String(120))

    address: Mapped[List["UserDirection"]] = relationship(
        "UserDirection", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password = generate_password_hash(password).decode('UTF-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username if self.username else None,
            "address": [a.serialize() for a in self.address] if self.address else None,
            "gender": self.gender,
            "birth_date": self.birth_date,
            "full_name": self.full_name,
            "is_admin": self.is_admin
            # do not serialize the password, its a security breach
        }


class UserDirection(db.Model):
    __tablename__ = "user_direction"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_address: Mapped[str] = mapped_column(String(120), nullable=False)
    second_address: Mapped[Optional[str]] = mapped_column(String(120))
    postal_code: Mapped[int] = mapped_column(nullable=False)
    city: Mapped[str] = mapped_column(String(20), nullable=False)
    province: Mapped[str] = mapped_column(String(40), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship("User", back_populates="address")

    def serialize(self):
        return {
            "id": self.id,
            "first_address": self.first_address,
            "second_address": self.second_address,
            "postal_code": self.postal_code,
            "city": self.city,
            "province": self.province,
            "phone": self.phone,
            "user_id": self.user_id,
        }
