
from . import db
from sqlalchemy import String, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, List, Any, Dict
from decimal import Decimal, ROUND_HALF_UP

_TWO = Decimal("0.01")


def redondeo(v: Optional[Decimal]) -> Optional[str]:
    if v is None:
        return None
    try:
        return str(v.quantize(_TWO, rounding=ROUND_HALF_UP))
    except Exception:
        return format(v, ".2f")


def _ref(obj: Any) -> Optional[Dict[str, Any]]:
    return {"id": obj.id, "name": obj.name} if obj else None


class Jewell(db.Model):
    __tablename__ = "jewells"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(500))
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
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

    category_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("categories.id"), index=True)
    coating_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("coatings.id"), index=True)
    brand_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("brands.id"), index=True)
    gender_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("genders.id"), index=True)
    clasp_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("clasps.id"), index=True)
    water_resistance_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("water_resistances.id"), index=True)
    caja_type_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("caja_types.id"), index=True)
    metal_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("metals.id"), index=True)
    gem_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("gems.id"), index=True)
    ring_type_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("ring_types.id"), index=True)
    earring_type_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("earring_types.id"), index=True)
    bracelet_type_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("bracelet_types.id"), index=True)
    watch_type_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("watch_types.id"), index=True)
    watch_bracelet_material_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("watch_bracelet_materials.id"), index=True)

    category_ref: Mapped[Optional["Category"]
                         ] = relationship(back_populates="jewells")
    coating_ref: Mapped[Optional["Coating"]
                        ] = relationship(back_populates="jewells")
    brand_ref: Mapped[Optional["Brand"]] = relationship(
        back_populates="jewells")
    gender_ref: Mapped[Optional["Gender"]] = relationship(
        back_populates="jewells")
    clasp_ref: Mapped[Optional["Clasp"]] = relationship(
        back_populates="jewells")
    water_resistance_ref: Mapped[Optional["WaterResistance"]] = relationship(
        back_populates="jewells")
    caja_type_ref: Mapped[Optional["CajaType"]
                          ] = relationship(back_populates="jewells")
    metal_ref: Mapped[Optional["Metal"]] = relationship(
        back_populates="jewells")
    gem_ref: Mapped[Optional["Gem"]] = relationship(back_populates="jewells")
    ring_type_ref: Mapped[Optional["RingType"]
                          ] = relationship(back_populates="jewells")
    earring_type_ref: Mapped[Optional["EarringType"]
                             ] = relationship(back_populates="jewells")
    bracelet_type_ref: Mapped[Optional["BraceletType"]
                              ] = relationship(back_populates="jewells")
    watch_type_ref: Mapped[Optional["WatchType"]
                           ] = relationship(back_populates="jewells")
    watch_bracelet_material_ref: Mapped[Optional["WatchBraceletMaterial"]] = relationship(
        back_populates="jewells")

    def serialize(self, *, include_fk: bool = True, include_relations: bool = False) -> dict:
        data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": redondeo(self.price),

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
            "watch_bracelet_material": self.Watch_bracelet_material,
        }

        if include_fk:
            data.update(
                {
                    "category_id": self.category_id,
                    "coating_id": self.coating_id,
                    "brand_id": self.brand_id,
                    "gender_id": self.gender_id,
                    "clasp_id": self.clasp_id,
                    "water_resistance_id": self.water_resistance_id,
                    "caja_type_id": self.caja_type_id,
                    "metal_id": self.metal_id,
                    "gem_id": self.gem_id,
                    "ring_type_id": self.ring_type_id,
                    "earring_type_id": self.earring_type_id,
                    "bracelet_type_id": self.bracelet_type_id,
                    "watch_type_id": self.watch_type_id,
                    "watch_bracelet_material_id": self.watch_bracelet_material_id,
                }
            )

        if include_relations:
            data.update(
                {
                    "category_ref": _ref(self.category_ref),
                    "coating_ref": _ref(self.coating_ref),
                    "brand_ref": _ref(self.brand_ref),
                    "gender_ref": _ref(self.gender_ref),
                    "clasp_ref": _ref(self.clasp_ref),
                    "water_resistance_ref": _ref(self.water_resistance_ref),
                    "caja_type_ref": _ref(self.caja_type_ref),
                    "metal_ref": _ref(self.metal_ref),
                    "gem_ref": _ref(self.gem_ref),
                    "ring_type_ref": _ref(self.ring_type_ref),
                    "earring_type_ref": _ref(self.earring_type_ref),
                    "bracelet_type_ref": _ref(self.bracelet_type_ref),
                    "watch_type_ref": _ref(self.watch_type_ref),
                    "watch_bracelet_material_ref": _ref(self.watch_bracelet_material_ref),
                }
            )

        return data

    @staticmethod
    def serialize_list(items, **kwargs) -> list[dict]:

        try:
            items = items.all()
        except Exception:
            pass
        return [obj.serialize(**kwargs) for obj in items]

    def __repr__(self) -> str:
        return f"<Jewell id={self.id!r} name={self.name!r}>"


class Category(db.Model):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="category_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class Coating(db.Model):
    __tablename__ = "coatings"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="coating_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class Brand(db.Model):
    __tablename__ = "brands"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="brand_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class Gender(db.Model):
    __tablename__ = "genders"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="gender_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class Clasp(db.Model):
    __tablename__ = "clasps"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="clasp_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class WaterResistance(db.Model):
    __tablename__ = "water_resistances"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="water_resistance_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class CajaType(db.Model):
    __tablename__ = "caja_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="caja_type_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class Metal(db.Model):
    __tablename__ = "metals"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="metal_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class Gem(db.Model):
    __tablename__ = "gems"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(back_populates="gem_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class RingType(db.Model):
    __tablename__ = "ring_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="ring_type_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class EarringType(db.Model):
    __tablename__ = "earring_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="earring_type_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class BraceletType(db.Model):
    __tablename__ = "bracelet_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="bracelet_type_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class WatchType(db.Model):
    __tablename__ = "watch_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="watch_type_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}


class WatchBraceletMaterial(db.Model):
    __tablename__ = "watch_bracelet_materials"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    jewells: Mapped[List[Jewell]] = relationship(
        back_populates="watch_bracelet_material_ref")

    def serialize(self) -> dict:
        return {"id": self.id, "name": self.name}
