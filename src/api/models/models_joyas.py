from typing import Optional, List
from sqlalchemy import String, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship, foreign
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

    category_rel = relationship("Category",
        primaryjoin=lambda: foreign(Jewell.category) == Category.name,
        back_populates="jewells", uselist=False)
    coating_rel = relationship("Coating",
        primaryjoin=lambda: foreign(Jewell.coating) == Coating.name,
        back_populates="jewells", uselist=False)
    brand_rel = relationship("Brand",
        primaryjoin=lambda: foreign(Jewell.brand) == Brand.name,
        back_populates="jewells", uselist=False)
    gender_rel = relationship("Gender",
        primaryjoin=lambda: foreign(Jewell.gender) == Gender.name,
        back_populates="jewells", uselist=False)
    clasp_rel = relationship("Clasp",
        primaryjoin=lambda: foreign(Jewell.clasp) == Clasp.name,
        back_populates="jewells", uselist=False)
    water_resistance_rel = relationship("WaterResistance",
        primaryjoin=lambda: foreign(Jewell.water_resistance) == WaterResistance.name,
        back_populates="jewells", uselist=False)
    caja_rel = relationship("CajaType",
        primaryjoin=lambda: foreign(Jewell.caja) == CajaType.name,
        back_populates="jewells", uselist=False)
    metal_rel = relationship("Metal",
        primaryjoin=lambda: foreign(Jewell.metal) == Metal.name,
        back_populates="jewells", uselist=False)
    gem_rel = relationship("Gem",
        primaryjoin=lambda: foreign(Jewell.gem) == Gem.name,
        back_populates="jewells", uselist=False)
    ring_type_rel = relationship("RingType",
        primaryjoin=lambda: foreign(Jewell.ring_type) == RingType.name,
        back_populates="jewells", uselist=False)
    earring_type_rel = relationship("EarringType",
        primaryjoin=lambda: foreign(Jewell.earring_type) == EarringType.name,
        back_populates="jewells", uselist=False)
    bracelet_rel = relationship("BraceletType",
        primaryjoin=lambda: foreign(Jewell.bracelet) == BraceletType.name,
        back_populates="jewells", uselist=False)
    watch_rel = relationship("WatchType",
        primaryjoin=lambda: foreign(Jewell.watch) == WatchType.name,
        back_populates="jewells", uselist=False)
    watch_bracelet_material_rel = relationship("WatchBraceletMaterial",
        primaryjoin=lambda: foreign(Jewell.watch_bracelet_material) == WatchBraceletMaterial.name,
        back_populates="jewells", uselist=False)

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

class Category(db.Model):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Category.name == foreign(Jewell.category),
        back_populates="category_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Coating(db.Model):
    __tablename__ = "coatings"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Coating.name == foreign(Jewell.coating),
        back_populates="coating_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Brand(db.Model):
    __tablename__ = "brands"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Brand.name == foreign(Jewell.brand),
        back_populates="brand_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Gender(db.Model):
    __tablename__ = "genders"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Gender.name == foreign(Jewell.gender),
        back_populates="gender_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Clasp(db.Model):
    __tablename__ = "clasps"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Clasp.name == foreign(Jewell.clasp),
        back_populates="clasp_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class WaterResistance(db.Model):
    __tablename__ = "water_resistances"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: WaterResistance.name == foreign(Jewell.water_resistance),
        back_populates="water_resistance_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class CajaType(db.Model):
    __tablename__ = "caja_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: CajaType.name == foreign(Jewell.caja),
        back_populates="caja_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Metal(db.Model):
    __tablename__ = "metals"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Metal.name == foreign(Jewell.metal),
        back_populates="metal_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class Gem(db.Model):
    __tablename__ = "gems"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: Gem.name == foreign(Jewell.gem),
        back_populates="gem_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class RingType(db.Model):
    __tablename__ = "ring_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: RingType.name == foreign(Jewell.ring_type),
        back_populates="ring_type_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class EarringType(db.Model):
    __tablename__ = "earring_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: EarringType.name == foreign(Jewell.earring_type),
        back_populates="earring_type_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class BraceletType(db.Model):
    __tablename__ = "bracelet_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: BraceletType.name == foreign(Jewell.bracelet),
        back_populates="bracelet_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class WatchType(db.Model):
    __tablename__ = "watch_types"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: WatchType.name == foreign(Jewell.watch),
        back_populates="watch_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}

class WatchBraceletMaterial(db.Model):
    __tablename__ = "watch_bracelet_materials"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    jewells: Mapped[List[Jewell]] = relationship(
        "Jewell",
        primaryjoin=lambda: WatchBraceletMaterial.name == foreign(Jewell.watch_bracelet_material),
        back_populates="watch_bracelet_material_rel", lazy="selectin")
    def serialize(self) -> dict: return {"id": self.id, "name": self.name}
