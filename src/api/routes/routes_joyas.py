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


def json_error(message, status=400, **extra):
    response_payload = {"ok": False, "error": message}
    response_payload.update(extra)
    return jsonify(response_payload), status



CATALOGS_FIELD_TO_MODEL = {
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

def normalize_value(value):
    if value is None:
        return None
    text = str(value).strip()
    return text or None

def upsert_catalogs_from_payload(request_payload: dict):

    for field_name, CatalogModel in CATALOGS_FIELD_TO_MODEL.items():
        field_value = normalize_value(request_payload.get(field_name))
        if not field_value:
            continue
        existing_row = CatalogModel.query.filter(
            func.lower(CatalogModel.name) == func.lower(field_value)
        ).first()
        if not existing_row:
            db.session.add(CatalogModel(name=field_value))


@Jewell_bp.route("/jewells", methods=["GET"])
def list_jewells():
    query = Jewell.query

    for field_name in CATALOGS_FIELD_TO_MODEL.keys():
        filter_value = request.args.get(field_name)
        if filter_value:
            query = query.filter(getattr(Jewell, field_name) == filter_value)

    serialized_items = [jewell_entity.serialize()
                        for jewell_entity in query.all()]
    return jsonify({"ok": True, "total": len(serialized_items), "items": serialized_items})


@Jewell_bp.route("/jewells/<int:jewell_id>", methods=["GET"])
def get_jewell(jewell_id: int):
    jewell_entity = Jewell.query.get_or_404(jewell_id)
    return jsonify({"ok": True, "item": jewell_entity.serialize()})



@Jewell_bp.route("/jewells", methods=["POST"])
def create_jewell():
    request_data = request.get_json(silent=True) or {}
    missing_required = [k for k in (
        "name", "description", "price") if k not in request_data]
    if missing_required:
        return json_error(f"Faltan campos: {', '.join(missing_required)}")

    try:
        price_value = float(request_data["price"])
    except Exception:
        return json_error("'price' debe ser número")
    try:
        optional_catalog_values = {k: normalize_value(
            request_data.get(k)) for k in CATALOGS_FIELD_TO_MODEL.keys()}
        jewell_entity = Jewell(
            name=normalize_value(request_data["name"]),
            description=normalize_value(request_data["description"]),
            price=price_value,
            url_image=normalize_value(request_data.get("url_image")),
            **optional_catalog_values,
        )
        db.session.add(jewell_entity)
        upsert_catalogs_from_payload(request_data)
        db.session.commit()
        return jsonify({"ok": True, "item": jewell_entity.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return json_error(f"No se pudo crear: {error}")


@Jewell_bp.route("/jewells/<int:jewell_id>", methods=["PUT"])
def update_jewell(jewell_id: int):
    jewell_entity = Jewell.query.get_or_404(jewell_id)
    request_data = request.get_json(silent=True) or {}
    missing_required = [k for k in (
        "name", "description", "price") if k not in request_data]
    if missing_required:
        return json_error(f"Faltan campos para PUT: {', '.join(missing_required)}")

    jewell_entity.name = normalize_value(request_data["name"])
    jewell_entity.description = normalize_value(request_data["description"])
    try:
        jewell_entity.price = float(request_data["price"])
    except Exception:
        return json_error("'price' debe ser número")

    for field_name in ["url_image", *CATALOGS_FIELD_TO_MODEL.keys()]:
        setattr(jewell_entity, field_name, normalize_value(
            request_data.get(field_name)))

    try:
        upsert_catalogs_from_payload(request_data)
        db.session.commit()
        return jsonify({"ok": True, "item": jewell_entity.serialize()})
    except Exception as error:
        db.session.rollback()
        return json_error(f"No se pudo actualizar: {error}")


@Jewell_bp.route("/jewells/<int:jewell_id>", methods=["DELETE"])
def delete_jewell(jewell_id: int):
    jewell_entity = Jewell.query.get_or_404(jewell_id)
    try:
        db.session.delete(jewell_entity)
        db.session.commit()
        return jsonify({"ok": True})
    except Exception as error:
        db.session.rollback()
        return json_error("No se pudo borrar", detail=str(error))


def list_catalog_entries(CatalogModel, include_jewells: bool = False):
    query = CatalogModel.query
    if include_jewells:
        query = query.options(selectinload(CatalogModel.jewells))

    catalog_entries = query.order_by(CatalogModel.name.asc()).all()
    response_items = []
    for catalog_entry in catalog_entries:
        serialized_entry = catalog_entry.serialize()
        if include_jewells:
            serialized_entry["jewells"] = [jewell_entity.serialize()
                                           for jewell_entity in catalog_entry.jewells]
        response_items.append(serialized_entry)

    return jsonify({"ok": True, "items": response_items})


def get_catalog_entry(CatalogModel, item_id: int):
    catalog_entry = CatalogModel.query.options(
        selectinload(CatalogModel.jewells)).get(item_id)
    if not catalog_entry:
        abort(404)
    return jsonify({
        "ok": True,
        "item": {
            **catalog_entry.serialize(),
            "jewells": [jewell_entity.serialize() for jewell_entity in catalog_entry.jewells],
        },
    })



@Jewell_bp.route("/coatings", methods=["GET"])
def coatings_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Coating, include_jewells=include_jewells)


@Jewell_bp.route("/coatings/<int:coating_id>", methods=["GET"])
def coatings_get(coating_id: int):
    return get_catalog_entry(Coating, coating_id)


@Jewell_bp.route("/categories", methods=["GET"])
def categories_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Category, include_jewells=include_jewells)


@Jewell_bp.route("/categories/<int:category_id>", methods=["GET"])
def categories_get(category_id: int):
    return get_catalog_entry(Category, category_id)


@Jewell_bp.route("/brands", methods=["GET"])
def brands_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Brand, include_jewells=include_jewells)


@Jewell_bp.route("/brands/<int:brand_id>", methods=["GET"])
def brands_get(brand_id: int):
    return get_catalog_entry(Brand, brand_id)


@Jewell_bp.route("/genders", methods=["GET"])
def genders_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Gender, include_jewells=include_jewells)


@Jewell_bp.route("/genders/<int:gender_id>", methods=["GET"])
def genders_get(gender_id: int):
    return get_catalog_entry(Gender, gender_id)


@Jewell_bp.route("/clasps", methods=["GET"])
def clasps_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Clasp, include_jewells=include_jewells)


@Jewell_bp.route("/clasps/<int:clasp_id>", methods=["GET"])
def clasps_get(clasp_id: int):
    return get_catalog_entry(Clasp, clasp_id)


@Jewell_bp.route("/water_resistances", methods=["GET"])
def water_resistances_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(WaterResistance, include_jewells=include_jewells)


@Jewell_bp.route("/water_resistances/<int:water_resistance_id>", methods=["GET"])
def water_resistances_get(water_resistance_id: int):
    return get_catalog_entry(WaterResistance, water_resistance_id)


@Jewell_bp.route("/caja_types", methods=["GET"])
def caja_types_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(CajaType, include_jewells=include_jewells)


@Jewell_bp.route("/caja_types/<int:caja_type_id>", methods=["GET"])
def caja_types_get(caja_type_id: int):
    return get_catalog_entry(CajaType, caja_type_id)


@Jewell_bp.route("/metals", methods=["GET"])
def metals_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Metal, include_jewells=include_jewells)


@Jewell_bp.route("/metals/<int:metal_id>", methods=["GET"])
def metals_get(metal_id: int):
    return get_catalog_entry(Metal, metal_id)


@Jewell_bp.route("/gems", methods=["GET"])
def gems_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(Gem, include_jewells=include_jewells)


@Jewell_bp.route("/gems/<int:gem_id>", methods=["GET"])
def gems_get(gem_id: int):
    return get_catalog_entry(Gem, gem_id)


@Jewell_bp.route("/ring_types", methods=["GET"])
def ring_types_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(RingType, include_jewells=include_jewells)


@Jewell_bp.route("/ring_types/<int:ring_type_id>", methods=["GET"])
def ring_types_get(ring_type_id: int):
    return get_catalog_entry(RingType, ring_type_id)


@Jewell_bp.route("/earring_types", methods=["GET"])
def earring_types_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(EarringType, include_jewells=include_jewells)


@Jewell_bp.route("/earring_types/<int:earring_type_id>", methods=["GET"])
def earring_types_get(earring_type_id: int):
    return get_catalog_entry(EarringType, earring_type_id)


@Jewell_bp.route("/bracelet_types", methods=["GET"])
def bracelet_types_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(BraceletType, include_jewells=include_jewells)


@Jewell_bp.route("/bracelet_types/<int:bracelet_type_id>", methods=["GET"])
def bracelet_types_get(bracelet_type_id: int):
    return get_catalog_entry(BraceletType, bracelet_type_id)


@Jewell_bp.route("/watch_types", methods=["GET"])
def watch_types_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(WatchType, include_jewells=include_jewells)


@Jewell_bp.route("/watch_types/<int:watch_type_id>", methods=["GET"])
def watch_types_get(watch_type_id: int):
    return get_catalog_entry(WatchType, watch_type_id)


@Jewell_bp.route("/watch_bracelet_materials", methods=["GET"])
def watch_bracelet_materials_list():
    include_jewells = request.args.get("include") == "jewells"
    return list_catalog_entries(WatchBraceletMaterial, include_jewells=include_jewells)


@Jewell_bp.route("/watch_bracelet_materials/<int:watch_bracelet_material_id>", methods=["GET"])
def watch_bracelet_materials_get(watch_bracelet_material_id: int):
    return get_catalog_entry(WatchBraceletMaterial, watch_bracelet_material_id)
