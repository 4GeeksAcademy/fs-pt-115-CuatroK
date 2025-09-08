from flask import Blueprint, request, jsonify
from api.model_config import db
from api.models.models_joyas import (
    Jewell,
    Category, Coating, Brand, Gender, Clasp, WaterResistance,
    CajaType, Metal, Gem, RingType, EarringType, BraceletType,
    WatchType, WatchBraceletMaterial
)

Jewell_bp = Blueprint('jewells_bp', __name__)



def json_error(message, status=400, **extra):
    payload = {"ok": False, "error": message}
    if extra:
        payload.update(extra)
    return jsonify(payload), status

@Jewell_bp.route('/jewells', methods=["GET"])
def list_jewells():
    query = Jewell.query

    filter_fields = [
        'category', 'coating', 'brand', 'gender', 'clasp', 'water_resistance',
        'caja', 'metal', 'gem', 'ring_type', 'earring_type', 'bracelet',
        'watch', 'watch_bracelet_material'
    ]
    for filter_name in filter_fields:
        filter_value = request.args.get(filter_name)
        if filter_value:
            query = query.filter(getattr(Jewell, filter_name) == filter_value)

    jewells = query.all()
    serialized_items = [jewell.serialize() for jewell in jewells]
    return jsonify({"ok": True, "total": len(serialized_items), "items": serialized_items})


@Jewell_bp.route('/jewells/<int:jewell_id>', methods=["GET"])
def get_jewell(jewell_id: int):
    jewell = Jewell.query.get_or_404(jewell_id)
    return jsonify({"ok": True, "item": jewell.serialize()})


@Jewell_bp.route('/jewells', methods=["POST"])
def create_jewell():
    payload = request.get_json(silent=True) or {}
    missing_fields = [key for key in ("name", "description", "price") if key not in payload]
    if missing_fields:
        return json_error(f"Faltan campos requeridos: {', '.join(missing_fields)}")

    try:
        price_value = float(payload["price"])
    except Exception:
        return json_error("'price' debe ser un número")

    try:
        jewell = Jewell(
            name=payload["name"],
            description=payload["description"],
            price=price_value,
            url_image=payload.get("url_image"),
            category=payload.get("category"),
            coating=payload.get("coating"),
            brand=payload.get("brand"),
            gender=payload.get("gender"),
            clasp=payload.get("clasp"),
            water_resistance=payload.get("water_resistance"),
            caja=payload.get("caja"),
            metal=payload.get("metal"),
            gem=payload.get("gem"),
            ring_type=payload.get("ring_type"),
            earring_type=payload.get("earring_type"),
            bracelet=payload.get("bracelet"),
            watch=payload.get("watch"),
            watch_bracelet_material=payload.get("watch_bracelet_material"),
        )
        db.session.add(jewell)
        db.session.commit()
        return jsonify({"ok": True, "item": jewell.serialize()}), 201
    except Exception as err:
        db.session.rollback()
        return json_error(f"No se pudo crear la joya: {err}")


@Jewell_bp.route('/jewells/<int:jewell_id>', methods=["PUT"])
def update_jewell(jewell_id: int):
    jewell = Jewell.query.get_or_404(jewell_id)
    payload = request.get_json(silent=True) or {}

    required_fields = ["name", "description", "price"]
    missing_fields = [key for key in required_fields if key not in payload]
    if missing_fields:
        return json_error(f"Faltan campos requeridos para PUT: {', '.join(missing_fields)}")

    jewell.name = payload["name"]
    jewell.description = payload["description"]
    try:
        jewell.price = float(payload["price"])
    except Exception:
        return json_error("'price' debe ser un número")

    optional_fields = [
        "url_image", "category", "coating", "brand", "gender", "clasp",
        "water_resistance", "caja", "metal", "gem", "ring_type",
        "earring_type", "bracelet", "watch", "watch_bracelet_material",
    ]
    for field_name in optional_fields:
        setattr(jewell, field_name, payload.get(field_name))

    try:
        db.session.commit()
        return jsonify({"ok": True, "item": jewell.serialize()})
    except Exception as err:
        db.session.rollback()
        return json_error(f"No se pudo actualizar: {err}")


@Jewell_bp.route('/jewells/<int:jewell_id>', methods=["DELETE"])
def delete_jewell(jewell_id: int):
    jewell = Jewell.query.get_or_404(jewell_id)
    try:
        db.session.delete(jewell)
        db.session.commit()
        return jsonify({"ok": True})
    except Exception as err:
        db.session.rollback()
        return json_error("No se pudo borrar la joya", 400, detail=str(err))


def _list_all(model_class):
    records = model_class.query.order_by(model_class.name.asc()).all()
    return jsonify({"ok": True, "items": [record.serialize() for record in records]})


@Jewell_bp.route("/coatings", methods=["GET"])
def list_coatings(): 
    return _list_all(Coating)

@Jewell_bp.route("/categories", methods=["GET"])
def list_categories(): 
    return _list_all(Category)

@Jewell_bp.route("/brands", methods=["GET"])
def list_brands(): 
    return _list_all(Brand)

@Jewell_bp.route("/genders", methods=["GET"])
def list_genders(): 
    return _list_all(Gender)

@Jewell_bp.route("/clasps", methods=["GET"])
def list_clasps(): 
    return _list_all(Clasp)

@Jewell_bp.route("/water_resistances", methods=["GET"])
def list_water_resistances(): 
    return _list_all(WaterResistance)

@Jewell_bp.route("/caja_types", methods=["GET"])
def list_caja_types(): 
    return _list_all(CajaType)

@Jewell_bp.route("/metals", methods=["GET"])
def list_metals(): 
    return _list_all(Metal)

@Jewell_bp.route("/gems", methods=["GET"])
def list_gems(): 
    return _list_all(Gem)

@Jewell_bp.route("/ring_types", methods=["GET"])
def list_ring_types(): 
    return _list_all(RingType)

@Jewell_bp.route("/earring_types", methods=["GET"])
def list_earring_types(): 
    return _list_all(EarringType)

@Jewell_bp.route("/bracelet_types", methods=["GET"])
def list_bracelet_types(): 
    return _list_all(BraceletType)

@Jewell_bp.route("/watch_types", methods=["GET"])
def list_watch_types(): 
    return _list_all(WatchType)

@Jewell_bp.route("/watch_bracelet_materials", methods=["GET"])
def list_watch_bracelet_materials(): 
    return _list_all(WatchBraceletMaterial)

