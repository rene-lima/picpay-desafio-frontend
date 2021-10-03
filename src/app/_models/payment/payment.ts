export class Payment {
  id?: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: Date;
  image: string;
  isPayed: boolean;

  constructor();
  constructor(obj: any);
  constructor(obj?: any) {
    this.id = null;
    this.name = !obj ? null : obj.name;
    this.username = !obj ? null : obj.username;
    this.title = !obj ? null : obj.title;
    this.value = !obj ? null : obj.value;
    this.date = !obj ? null : obj.date;
    this.image = null;
    this.isPayed = false;
  }
}
