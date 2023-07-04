export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  checkItems() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        if (this.items[i].quality !== 80) {
          throw "Sulfuras quality not 80";
        }
      } else if (this.items[i].quality < 0) {
        throw "Negative quality";
      } else if (this.items[i].quality > 50) {
        throw "Quality over 50";
      }
    }
    return
  }

  updateQuality() {
    let special_names = ["Aged Brie", 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros']

    for (let i = 0; i < this.items.length; i++) {

      if (! special_names.includes(this.items[i].name)) {
        if (this.items[i].sellIn > 0) {
          this.items[i].quality --;
        } else {
          this.items[i].quality -= 2;
        }
          
      } else if (this.items[i].name == "Aged Brie") {
        if (this.items[i].sellIn > 0) {
          this.items[i].quality ++;
        } else {
          this.items[i].quality += 2;
        } 

      } else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].sellIn < 1) {
          this.items[i].quality = 0; 
        } else if (this.items[i].sellIn < 6) {
          this.items[i].quality += 3;
        } else if (this.items[i].sellIn < 11) {
          this.items[i].quality += 2;
        } else {
          this.items[i].quality ++;
        }
      }

      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn --;
      }

      if (this.items[i].quality < 0) {
        this.items[i].quality = 0
      } else if (this.items[i].quality > 50 && this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
        this.items[i].quality = 50
      }
    }
    return this.items;
  }
}