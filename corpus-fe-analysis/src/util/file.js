export default class File {
  constructor({ name, children = [], fullName = '', parent = null, selectAll = false } = {}) {
    this.name = name;
    this.children = children;
    this.fullName = fullName;
    this.parent = parent;
    this.depth = this.parent ? this.parent.depth + 1 : 0;
    this.data = '';
    this.selectAll = selectAll;
  }
  pushDir(name) {
    let fullName = `${this.fullName}/${name}`;
    this.children.push(
      new File({
        name,
        fullName,
        children: [],
        parent: this,
      }),
    );
  }
  pushFile(name) {
    let fullName = `${this.fullName}/${name}`;
    this.children.push(
      new File({
        name,
        fullName,
        parent: this,
      }),
    );
  }
  pushNode(name) {
    let fullName = `/${this.fullName}`;
    if (fullName === '/') fullName = '//';
    // console.log(name+': '+fullName);
    this.children.unshift(
      new File({
        name,
        fullName,
        parent: this,
        selectAll: true,
      }),
    );
  }
}
