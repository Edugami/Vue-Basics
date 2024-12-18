export class SubResource {
  public id: number;
  public variable_1: number;
  public variable_2: number;

  constructor(id: number) {
    this.id = id;
    this.variable_1 = 0;
    this.variable_2 = 0;
  }

  onClick() {
    this.variable_1 += 2;
    this.variable_2 -= 1;

    console.log('SubResource: ', this.id, ' Var 1: ', this.variable_1, 'Var 2: ', this.variable_2);
  }
};

export class Resource {
  public id: number;
  public subResources: SubResource[];

  constructor(id: number) {
    this.id = id;
    this.subResources = [];
  }

  createSubResource(id: number) {
    this.subResources.push(new SubResource(id));
  }

  removeSubResource(index: number) {
    this.subResources.splice(index, 1);
  }
}
