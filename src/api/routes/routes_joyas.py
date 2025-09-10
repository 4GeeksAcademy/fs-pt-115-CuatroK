from flask import Blueprint, request, jsonify
from api.extentions import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import selectinload
from decimal import Decimal
from typing import Any, Optional
from flask_cors import CORS

from api.models.models_joyas import (
    Jewell,
    Category,
    Coating,
    Brand,
    Gender,
    Clasp,
    WaterResistance,
    CajaType,
    Metal,
    Gem,
    RingType,
    EarringType,
    BraceletType,
    WatchType,
    WatchBraceletMaterial,
)

Jewell_bp = Blueprint('jewells_bp', __name__)

CORS(Jewell_bp)

Ejemplo = {
    "id": 1,
    "name": "Anillo Luna",
    "description": "Plata 925 con circonita",
    "price": "49.90"

}


def json_error(msg: str, status: int = 400, **extra):
    payload = {"ok": False, "error": msg}
    if extra:
        payload.update(extra)
    return jsonify(payload), status


def parse_decimal(value: Any) -> Optional[Decimal]:
    if value is None:
        return None
    if isinstance(value, Decimal):
        return value
    try:
        return Decimal(str(value))
    except Exception:
        raise ValueError("'price' debe ser un decimal válido")


@Jewell_bp.route('/jewells', methods=["GET"])
def list_jewells():
    include_rel = request.args.get('include_relations', '0') in {
        '1', 'true', 'True'}
    page = max(int(request.args.get('page', 1)), 1)
    per_page = min(max(int(request.args.get('per_page', 20)), 1), 200)

    q = Jewell.query

    for key in (
        'category_id', 'coating_id', 'brand_id', 'gender_id', 'clasp_id', 'water_resistance_id',
        'caja_type_id', 'metal_id', 'gem_id', 'ring_type_id', 'earring_type_id',
        'bracelet_type_id', 'watch_type_id', 'watch_bracelet_material_id'
    ):
        raw = request.args.get(key)
        if raw is not None and raw != "":
            try:
                q = q.filter(getattr(Jewell, key) == int(raw))
            except ValueError:
                return json_error(f"'{key}' debe ser un entero", 400)

    if include_rel:
        q = q.options(
            selectinload(Jewell.category_ref),
            selectinload(Jewell.coating_ref),
            selectinload(Jewell.brand_ref),
            selectinload(Jewell.gender_ref),
            selectinload(Jewell.clasp_ref),
            selectinload(Jewell.water_resistance_ref),
            selectinload(Jewell.caja_type_ref),
            selectinload(Jewell.metal_ref),
            selectinload(Jewell.gem_ref),
            selectinload(Jewell.ring_type_ref),
            selectinload(Jewell.earring_type_ref),
            selectinload(Jewell.bracelet_type_ref),
            selectinload(Jewell.watch_type_ref),
            selectinload(Jewell.watch_bracelet_material_ref),
        )

    page_obj = q.paginate(page=page, per_page=per_page, error_out=False)
    data = Jewell.serialize_list(
        page_obj.items, include_fk=True, include_relations=include_rel)

    return jsonify({
        "ok": True,
        "page": page,
        "per_page": per_page,
        "total": page_obj.total,
        "items": data,
    })


@Jewell_bp.route('/jewells/<int:jewell_id>', methods=["GET"])
def get_jewell(jewell_id: int):
    include_rel = request.args.get('include_relations', '0') in {
        '1', 'true', 'True'}
    q = Jewell.query
    if include_rel:
        q = q.options(
            selectinload(Jewell.category_ref),
            selectinload(Jewell.coating_ref),
            selectinload(Jewell.brand_ref),
            selectinload(Jewell.gender_ref),
            selectinload(Jewell.clasp_ref),
            selectinload(Jewell.water_resistance_ref),
            selectinload(Jewell.caja_type_ref),
            selectinload(Jewell.metal_ref),
            selectinload(Jewell.gem_ref),
            selectinload(Jewell.ring_type_ref),
            selectinload(Jewell.earring_type_ref),
            selectinload(Jewell.bracelet_type_ref),
            selectinload(Jewell.watch_type_ref),
            selectinload(Jewell.watch_bracelet_material_ref),
        )
    obj = q.get_or_404(jewell_id)
    return jsonify({"ok": True, "item": obj.serialize(include_fk=True, include_relations=include_rel)})


@Jewell_bp.route('/jewells', methods=["POST"])
def create_jewell():
    payload = request.get_json(silent=True) or {}

    missing = [k for k in ("name", "description", "price") if k not in payload]
    if missing:
        return json_error(f"Faltan campos requeridos: {', '.join(missing)}", 400)

    try:
        obj = Jewell(
            name=payload['name'],
            description=payload['description'],
            price=parse_decimal(payload['price']),
            url_image=payload.get('url_image'),
            category=payload.get('category'),
            coating=payload.get('coating'),
            brand=payload.get('brand'),
            gender=payload.get('gender'),
            clasp=payload.get('clasp'),
            water_resistance=payload.get('water_resistance'),
            caja=payload.get('caja'),
            metal=payload.get('metal'),
            gem=payload.get('gem'),
            ring_type=payload.get('ring_type'),
            earring_type=payload.get('earring_type'),
            bracelet=payload.get('bracelet'),
            watch=payload.get('watch'),
            watch_bracelet_material=payload.get('watch_bracelet_material'),
            category_id=payload.get('category_id'),
            coating_id=payload.get('coating_id'),
            brand_id=payload.get('brand_id'),
            gender_id=payload.get('gender_id'),
            clasp_id=payload.get('clasp_id'),
            water_resistance_id=payload.get('water_resistance_id'),
            caja_type_id=payload.get('caja_type_id'),
            metal_id=payload.get('metal_id'),
            gem_id=payload.get('gem_id'),
            ring_type_id=payload.get('ring_type_id'),
            earring_type_id=payload.get('earring_type_id'),
            bracelet_type_id=payload.get('bracelet_type_id'),
            watch_type_id=payload.get('watch_type_id'),
            watch_bracelet_material_id=payload.get(
                'watch_bracelet_material_id'),
        )
        db.session.add(obj)
        db.session.commit()
        return jsonify({"ok": True, "item": obj.serialize(include_fk=True)}), 201
    except (IntegrityError, ValueError) as e:
        db.session.rollback()
        return json_error(str(e), 400)


@Jewell_bp.route('/jewells/<int:jewell_id>', methods=["PUT"])
def update_jewell(jewell_id: int):
    obj = Jewell.query.get_or_404(jewell_id)
    payload = request.get_json(silent=True) or {}

    required = ["name", "description", "price"]
    missing = [k for k in required if k not in payload]
    if missing:
        return json_error(f"Faltan campos requeridos para PUT: {', '.join(missing)}", 400)

    obj.name = payload["name"]
    obj.description = payload["description"]
    obj.price = parse_decimal(payload["price"])

    optional_text = [
        "url_image", "category", "coating", "brand", "gender", "clasp",
        "water_resistance", "caja", "metal", "gem", "ring_type",
        "earring_type", "bracelet", "watch", "watch_bracelet_material",
    ]
    for f in optional_text:
        setattr(obj, f, payload.get(f))

    optional_fks = [
        "category_id", "coating_id", "brand_id", "gender_id", "clasp_id",
        "water_resistance_id", "caja_type_id", "metal_id", "gem_id",
        "ring_type_id", "earring_type_id", "bracelet_type_id",
        "watch_type_id", "watch_bracelet_material_id",
    ]
    for f in optional_fks:
        setattr(obj, f, payload.get(f))

    try:
        db.session.commit()
        return jsonify({"ok": True, "item": obj.serialize(include_fk=True)})
    except (IntegrityError, ValueError) as e:
        db.session.rollback()
        return json_error(str(e), 400)


def _create_name(model):
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    if not name:
        return json_error("Campo 'name' es requerido", 400)
    if len(name) > 60:
        return json_error("Campo 'name' supera 60 caracteres", 400)
    try:
        obj = model(name=name)
        db.session.add(obj)
        db.session.commit()
        return jsonify({"ok": True, "item": obj.serialize()}), 201
    except IntegrityError as e:
        db.session.rollback()
        return json_error("Nombre duplicado o inválido", 400, detail=str(e))


@Jewell_bp.route('/jewells/<int:jewell_id>', methods=["DELETE"])
def delete_jewell(jewell_id: int):
    obj = Jewell.query.get_or_404(jewell_id)

    try:
        db.session.delete(obj)
        db.session.commit()
        return jsonify({"ok": True})
    except IntegrityError as e:
        db.session.rollback()
        return json_error("No se pudo borrar la joya", 400, detail=str(e))


@Jewell_bp.route("/categories", methods=["POST"])
def create_category():
    return _create_name(Category)


@Jewell_bp.route("/coatings", methods=["POST"])
def create_coating():
    return _create_name(Coating)


@Jewell_bp.route("/brands", methods=["POST"])
def create_brand():
    return _create_name(Brand)


@Jewell_bp.route("/genders", methods=["POST"])
def create_gender():
    return _create_name(Gender)


@Jewell_bp.route("/clasps", methods=["POST"])
def create_clasp():
    return _create_name(Clasp)


@Jewell_bp.route("/water_resistances", methods=["POST"])
def create_water_resistance():
    return _create_name(WaterResistance)


@Jewell_bp.route("/caja_types", methods=["POST"])
def create_caja_type():
    return _create_name(CajaType)


@Jewell_bp.route("/metals", methods=["POST"])
def create_metal():
    return _create_name(Metal)


@Jewell_bp.route("/gems", methods=["POST"])
def create_gem():
    return _create_name(Gem)


@Jewell_bp.route("/ring_types", methods=["POST"])
def create_ring_type():
    return _create_name(RingType)


@Jewell_bp.route("/earring_types", methods=["POST"])
def create_earring_type():
    return _create_name(EarringType)


@Jewell_bp.route("/bracelet_types", methods=["POST"])
def create_bracelet_type():
    return _create_name(BraceletType)


@Jewell_bp.route("/watch_types", methods=["POST"])
def create_watch_type():
    return _create_name(WatchType)


@Jewell_bp.route("/watch_bracelet_materials", methods=["POST"])
def create_watch_bracelet_material():
    return _create_name(WatchBraceletMaterial)
