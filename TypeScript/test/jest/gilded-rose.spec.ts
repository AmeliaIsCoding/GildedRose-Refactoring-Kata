import { Item, GildedRose } from '@/gilded-rose';

describe('Basic quality testing', () => {
  it('Testing basic item quality after 1 day', () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });
  it("Testing basic item quality 1 day after sell by", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });
  it("Testing basic item quality 3 days after sell by", () => {
    const gildedRose = new GildedRose([new Item("foo", -2, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });
});

describe("Aged Brie quality testing", () => {
  it("Testing Aged Brie quality after 1 day", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });
  it("Testing Aged Brie quality 1 day after sell-by", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });
  it("Testing Aged Brie quality 3 days after sell by", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });
  it("Testing Aged Brie quality doesn't go over 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
});

describe("Backstage pass quality testing", () => {
  it("Testing backstage pass quality after 12 days to go", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });
  it("Testing backstage pass quality after 10 days to go", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });
  it("Testing backstage pass quality after 4 days to go", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });
  it("Testing backstage pass quality after 1 day to go", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });
  it("Testing backstage pass quality after 0 days to go", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  it("Testing backstage pass quality after 3 days to go", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", -3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  it("Testing backstage pass quality does not go over 50", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
});

describe("Sulfuras quality testing", () => {
  it("Testing Sulfuras quality stays at 80 after 1 day", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
});

describe("Sell in testing", () => {
  it("Testing basic item sell in after 1 day", () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });
  it("Testing Aged Brie sell in after 1 day", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });
  it("Testing backstage pass sell in after 1 day", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });
  it("Testing Sulfuras sell in after 1 day", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5);
  });
  it("Testing Sulfuras sell in after 1 day with negative sell in value", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-5);
  });
});

describe("Input checking", () => {
  it("Testing no error is thrown if basic item created with quality 20", () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 20)]);
    expect(() => gildedRose.checkItems()).not.toThrow();
  });
  it("Testing no error is thrown if basic item created with quality 0", () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 0)]);
    expect(() => gildedRose.checkItems()).not.toThrow();
  });
  it("Testing no error is thrown if basic item created with quality 50", () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 50)]);
    expect(() => gildedRose.checkItems()).not.toThrow();
  });
  it("Testing no error is thrown if Sulfuras is created with quality 80", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);
    expect(() => gildedRose.checkItems()).not.toThrow();
  });
  it("Testing an error is thrown if basic item is created with quality over 50", () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 60)]);
    expect(() => gildedRose.checkItems()).toThrow("Quality over 50");
  });
  it("Testing an error is thrown if basic item is created with negative quality", () => {
    const gildedRose = new GildedRose([new Item('foo', 5, -5)]);
    expect(() => gildedRose.checkItems()).toThrow("Negative quality");
  });
  it("Testing an error is thrown if Sulfuras is created with quality other than 80", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 55)]);
    expect(() => gildedRose.checkItems()).toThrow("Sulfuras quality not 80");
  });
});

describe("Conjured item testing", () => {
  it("Testing basic conjured item", () => {
    const gildedRose = new GildedRose([new Item('Conjured foo', 5, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });
  it("Testing conjured Aged Brie", () => {
    const gildedRose = new GildedRose([new Item('Conjured Aged Brie', 5, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(17);
  });
  it("Testing conjured backstage passes", () => {
    const gildedRose = new GildedRose([new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 4, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
  });
  it("Testing conjured Sulfuras", () => {
    const gildedRose = new GildedRose([new Item('Conjured Sulfuras, Hand of Ragnaros', 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
});
