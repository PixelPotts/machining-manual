export class ToolComponent {
  constructor({ name, zone, radius, zMinFromTip, zMaxFromTip }) {
    this.name = name;
    this.zone = zone;
    this.radius = radius;
    this.zMinFromTip = zMinFromTip;
    this.zMaxFromTip = zMaxFromTip;
  }

  zRangeAtTip(tipZ) {
    return [tipZ + this.zMinFromTip, tipZ + this.zMaxFromTip];
  }
}

export class ToolAssembly {
  constructor({ id, h, diameter, fluteLength, shankDiameter, shankLength, holderDiameter, holderLength }) {
    this.id = id;
    this.h = h;
    this.diameter = diameter;
    this.fluteLength = fluteLength;
    this.shankDiameter = shankDiameter;
    this.shankLength = shankLength;
    this.holderDiameter = holderDiameter;
    this.holderLength = holderLength;
    this.components = [
      new ToolComponent({
        name: `T${id} cutter flutes`,
        zone: 'cutter',
        radius: diameter / 2,
        zMinFromTip: 0,
        zMaxFromTip: fluteLength
      }),
      new ToolComponent({
        name: `T${id} shank`,
        zone: 'forbidden',
        radius: shankDiameter / 2,
        zMinFromTip: fluteLength,
        zMaxFromTip: fluteLength + shankLength
      }),
      new ToolComponent({
        name: `T${id} holder`,
        zone: 'forbidden',
        radius: holderDiameter / 2,
        zMinFromTip: fluteLength + shankLength,
        zMaxFromTip: fluteLength + shankLength + holderLength
      })
    ];
  }

  cutter() {
    return this.components.find(component => component.zone === 'cutter');
  }
}

export function defaultToolLibrary(params = {}) {
  return new Map([
    [1, new ToolAssembly({
      id: 1,
      h: 1,
      diameter: params.diameter ?? 0.25,
      fluteLength: params.fluteLength ?? 0.75,
      shankDiameter: params.shankDiameter ?? 0.25,
      shankLength: params.shankLength ?? 1.25,
      holderDiameter: params.holderDiameter ?? 1.25,
      holderLength: params.holderLength ?? 1.0
    })]
  ]);
}
