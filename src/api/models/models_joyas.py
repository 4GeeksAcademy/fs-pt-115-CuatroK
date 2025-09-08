from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Numeric
from . import db

class Jewell(db.Model):
    __tablename__ = "jewells"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(500))

   
    price: Mapped[float] = mapped_column(Numeric(10, 2, asdecimal=False))
    url_image: Mapped[Optional[str]] = mapped_column(String(500))

    category: Mapped[Optional[str]] = mapped_column(String(30))
    coating: Mapped[Optional[str]] = mapped_column(String(30))
    brand: Mapped[Optional[str]] = mapped_column(String(30))
    gender: Mapped[Optional[str]] = mapped_column(String(30))
    clasp: Mapped[Optional[str]] = mapped_column(String(30))
    water_resistance: Mapped[Optional[str]] = mapped_column(String(30))
    caja: Mapped[Optional[str]] = mapped_column(String(30))
    metal: Mapped[Optional[str]] = mapped_column(String(30))
    gem: Mapped[Optional[str]] = mapped_column(String(30))
    ring_type: Mapped[Optional[str]] = mapped_column(String(30))
    earring_type: Mapped[Optional[str]] = mapped_column(String(30))
    bracelet: Mapped[Optional[str]] = mapped_column(String(30))
    watch: Mapped[Optional[str]] = mapped_column(String(30))
    watch_bracelet_material: Mapped[Optional[str]] = mapped_column(String(30))

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": round(self.price, 2) if self.price is not None else None,
            "url_image": self.url_image,
            "category": self.category,
            "coating": self.coating,
            "brand": self.brand,
            "gender": self.gender,
            "clasp": self.clasp,
            "water_resistance": self.water_resistance,
            "caja": self.caja,
            "metal": self.metal,
            "gem": self.gem,
            "ring_type": self.ring_type,
            "earring_type": self.earring_type,
            "bracelet": self.bracelet,
            "watch": self.watch,
            "watch_bracelet_material": self.watch_bracelet_material,
        }

    def __repr__(self) -> str:
        return f"<Jewell id={self.id!r} name={self.name!r}>"

class Category(db.Model):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Coating(db.Model):
    __tablename__ = "coatings"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Brand(db.Model):
    __tablename__ = "brands"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Gender(db.Model):
    __tablename__ = "genders"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Clasp(db.Model):
    __tablename__ = "clasps"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class WaterResistance(db.Model):
    __tablename__ = "water_resistances"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class CajaType(db.Model):
    __tablename__ = "caja_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Metal(db.Model):
    __tablename__ = "metals"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Gem(db.Model):
    __tablename__ = "gems"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class RingType(db.Model):
    __tablename__ = "ring_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class EarringType(db.Model):
    __tablename__ = "earring_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class BraceletType(db.Model):
    __tablename__ = "bracelet_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class WatchType(db.Model):
    __tablename__ = "watch_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class WatchBraceletMaterial(db.Model):
    __tablename__ = "watch_bracelet_materials"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}
