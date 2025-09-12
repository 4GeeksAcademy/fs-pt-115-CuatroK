from flask import Blueprint, request, jsonify, abort
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from api.model_config import db
from api.models.models_joyas import (
    Jewell,
    Category, Coating, Brand, Gender, Clasp, WaterResistance,
    CajaType, Metal, Gem, RingType, EarringType, BraceletType,
    WatchType, WatchBraceletMaterial
)

Jewell_bp = Blueprint("jewells_bp", __name__)

def json_error(msg, status=400, **extra):
    out = {"ok": False, "error": msg}
    out.update(extra)
    return jsonify(out), status


CATALOGS = {
    "category": Category,
    "coating": Coating,
    "brand": Brand,
    "gender": Gender,
    "clasp": Clasp,
    "water_resistance": WaterResistance,
    "caja": CajaType,
    "metal": Metal,
    "gem": Gem,
    "ring_type": RingType,
    "earring_type": EarringType,
    "bracelet": BraceletType,
    "watch": WatchType,
    "watch_bracelet_material": WatchBraceletMaterial,
}

def norm(v):
    if v is None: return None
    v = str(v).strip()
    return v or None

def upsert_catalogs(payload: dict):
    """Crea el valor en el catálogo si no existe (por nombre, case-insensitive)."""
    for field, Model in CATALOGS.items():
        val = norm(payload.get(field))
        if not val: 
            continue
        exists = Model.query.filter(func.lower(Model.name) == func.lower(val)).first()
        if not exists:
            db.session.add(Model(name=val))


@Jewell_bp.route("/jewells", methods=["GET"])
def list_jewells():
    q = Jewell.query
    for f in CATALOGS.keys():
        val = request.args.get(f)
        if val:
            q = q.filter(getattr(Jewell, f) == val)
    items = [j.serialize() for j in q.all()]
    return jsonify({"ok": True, "total": len(items), "items": items})

@Jewell_bp.route("/jewells/<int:jewell_id>", methods=["GET"])
def get_jewell(jewell_id: int):
    j = Jewell.query.get_or_404(jewell_id)
    return jsonify({"ok": True, "item": j.serialize()})

@Jewell_bp.route("/jewells", methods=["POST"])
def create_jewell():
    data = request.get_json(silent=True) or {}
    need = [k for k in ("name","description","price") if k not in data]
    if need: return json_error(f"Faltan campos: {', '.join(need)}")
    try:
        price = float(data["price"])
    except Exception:
        return json_error("'price' debe ser número")

    try:
        opts = {k: norm(data.get(k)) for k in CATALOGS.keys()}
        j = Jewell(
            name=norm(data["name"]),
            description=norm(data["description"]),
            price=price,
            url_image=norm(data.get("url_image")),
            **opts,
        )
        db.session.add(j)
        upsert_catalogs(data)
        db.session.commit()
        return jsonify({"ok": True, "item": j.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return json_error(f"No se pudo crear: {e}")

@Jewell_bp.route("/jewells/<int:jewell_id>", methods=["PUT"])
def update_jewell(jewell_id: int):
    j = Jewell.query.get_or_404(jewell_id)
    data = request.get_json(silent=True) or {}
    need = [k for k in ("name","description","price") if k not in data]
    if need: return json_error(f"Faltan campos para PUT: {', '.join(need)}")

    j.name = norm(data["name"])
    j.description = norm(data["description"])
    try:
        j.price = float(data["price"])
    except Exception:
        return json_error("'price' debe ser número")

    for f in ["url_image", *CATALOGS.keys()]:
        setattr(j, f, norm(data.get(f)))
    try:
        upsert_catalogs(data)
        db.session.commit()
        return jsonify({"ok": True, "item": j.serialize()})
    except Exception as e:
        db.session.rollback()
        return json_error(f"No se pudo actualizar: {e}")

@Jewell_bp.route("/jewells/<int:jewell_id>", methods=["DELETE"])
def delete_jewell(jewell_id: int):
    j = Jewell.query.get_or_404(jewell_id)
    try:
        db.session.delete(j)
        db.session.commit()
        return jsonify({"ok": True})
    except Exception as e:
        db.session.rollback()
        return json_error("No se pudo borrar", detail=str(e))



def list_catalog(Model, include_items=False):
    q = Model.query
    if include_items:
        q = q.options(selectinload(Model.jewells))
    rows = q.order_by(Model.name.asc()).all()
    out = []
    for r in rows:
        item = r.serialize()
        if include_items:
            item["jewells"] = [j.serialize() for j in r.jewells]
        out.append(item)
    return jsonify({"ok": True, "items": out})

def get_catalog(Model, item_id: int):
    r = Model.query.options(selectinload(Model.jewells)).get(item_id)
    if not r: abort(404)
    return jsonify({
        "ok": True,
        "item": {**r.serialize(), "jewells": [j.serialize() for j in r.jewells]}
    })


@Jewell_bp.route("/coatings", methods=["GET"])
def coatings_list(): return list_catalog(Coating, request.args.get("include")=="jewells")

@Jewell_bp.route("/coatings/<int:coating_id>", methods=["GET"])
def coatings_get(coating_id:int): return get_catalog(Coating, coating_id)

@Jewell_bp.route("/categories", methods=["GET"])
def categories_list(): return list_catalog(Category, request.args.get("include")=="jewells")

@Jewell_bp.route("/categories/<int:category_id>", methods=["GET"])
def categories_get(category_id:int): return get_catalog(Category, category_id)

@Jewell_bp.route("/brands", methods=["GET"])
def brands_list(): return list_catalog(Brand, request.args.get("include")=="jewells")

@Jewell_bp.route("/brands/<int:brand_id>", methods=["GET"])
def brands_get(brand_id:int): return get_catalog(Brand, brand_id)

@Jewell_bp.route("/genders", methods=["GET"])
def genders_list(): return list_catalog(Gender, request.args.get("include")=="jewells")

@Jewell_bp.route("/genders/<int:gender_id>", methods=["GET"])
def genders_get(gender_id:int): return get_catalog(Gender, gender_id)

@Jewell_bp.route("/clasps", methods=["GET"])
def clasps_list(): return list_catalog(Clasp, request.args.get("include")=="jewells")

@Jewell_bp.route("/clasps/<int:clasp_id>", methods=["GET"])
def clasps_get(clasp_id:int): return get_catalog(Clasp, clasp_id)

@Jewell_bp.route("/water_resistances", methods=["GET"])
def wr_list(): return list_catalog(WaterResistance, request.args.get("include")=="jewells")

@Jewell_bp.route("/water_resistances/<int:wr_id>", methods=["GET"])
def wr_get(wr_id:int): return get_catalog(WaterResistance, wr_id)

@Jewell_bp.route("/caja_types", methods=["GET"])
def caja_list(): return list_catalog(CajaType, request.args.get("include")=="jewells")

@Jewell_bp.route("/caja_types/<int:caja_id>", methods=["GET"])
def caja_get(caja_id:int): return get_catalog(CajaType, caja_id)

@Jewell_bp.route("/metals", methods=["GET"])
def metals_list(): return list_catalog(Metal, request.args.get("include")=="jewells")

@Jewell_bp.route("/metals/<int:metal_id>", methods=["GET"])
def metals_get(metal_id:int): return get_catalog(Metal, metal_id)

@Jewell_bp.route("/gems", methods=["GET"])
def gems_list(): return list_catalog(Gem, request.args.get("include")=="jewells")

@Jewell_bp.route("/gems/<int:gem_id>", methods=["GET"])
def gems_get(gem_id:int): return get_catalog(Gem, gem_id)

@Jewell_bp.route("/ring_types", methods=["GET"])
def ring_types_list(): return list_catalog(RingType, request.args.get("include")=="jewells")

@Jewell_bp.route("/ring_types/<int:ring_type_id>", methods=["GET"])
def ring_types_get(ring_type_id:int): return get_catalog(RingType, ring_type_id)

@Jewell_bp.route("/earring_types", methods=["GET"])
def earring_types_list(): return list_catalog(EarringType, request.args.get("include")=="jewells")

@Jewell_bp.route("/earring_types/<int:earring_type_id>", methods=["GET"])
def earring_types_get(earring_type_id:int): return get_catalog(EarringType, earring_type_id)

@Jewell_bp.route("/bracelet_types", methods=["GET"])
def bracelet_types_list(): return list_catalog(BraceletType, request.args.get("include")=="jewells")

@Jewell_bp.route("/bracelet_types/<int:bracelet_type_id>", methods=["GET"])
def bracelet_types_get(bracelet_type_id:int): return get_catalog(BraceletType, bracelet_type_id)

@Jewell_bp.route("/watch_types", methods=["GET"])
def watch_types_list(): return list_catalog(WatchType, request.args.get("include")=="jewells")

@Jewell_bp.route("/watch_types/<int:watch_type_id>", methods=["GET"])
def watch_types_get(watch_type_id:int): return get_catalog(WatchType, watch_type_id)

@Jewell_bp.route("/watch_bracelet_materials", methods=["GET"])
def wbm_list(): return list_catalog(WatchBraceletMaterial, request.args.get("include")=="jewells")

@Jewell_bp.route("/watch_bracelet_materials/<int:wbm_id>", methods=["GET"])
def wbm_get(wbm_id:int): return get_catalog(WatchBraceletMaterial, wbm_id)
