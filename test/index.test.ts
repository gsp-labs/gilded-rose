import { GildedRose } from "../src";

describe("Gilded Rose", () => {
  it("should lower sellIn value by 1 at the end of day", () => {
    const gildedRose = new GildedRose([
      { name: "+5 Dexterity Vest", quality: 20, sellIn: 10 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  it("should lower quality value by 1 at the end of day", () => {
    const gildedRose = new GildedRose([
      { name: "+5 Dexterity Vest", quality: 20, sellIn: 10 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
  });

  it("should lower quality value by 2 once the sll by date has passed", () => {
    const gildedRose = new GildedRose([
      { name: "+5 Dexterity Vest", quality: 20, sellIn: 0 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(18);
  });

  it("should NOT lower quality when it approaches zero", () => {
    const gildedRose = new GildedRose([
      { name: "+5 Dexterity Vest", quality: 0, sellIn: 0 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should increase quality of Aged Brie by 1 at the end of day", () => {
    const gildedRose = new GildedRose([
      { name: "Aged Brie", quality: 20, sellIn: 10 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(21);
  });

  it("should NOT increase quality above 50", () => {
    const gildedRose = new GildedRose([
      { name: "Aged Brie", quality: 50, sellIn: 10 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("should not update quality or sellIn value for Sulfuras, Hand of Ragnaros", () => {
    const gildedRose = new GildedRose([
      { name: "Sulfuras, Hand of Ragnaros", quality: 20, sellIn: 10 },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(20);
  });

  it("should increase quality for Backstage passes to a TAFKAL80ETC concert by 1", () => {
    const gildedRose = new GildedRose([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 20,
        sellIn: 11,
      },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(21);
  });

  it("should increase quality for Backstage passes to a TAFKAL80ETC concert by 2  when there are 10 days or less", () => {
    const gildedRose = new GildedRose([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 20,
        sellIn: 10,
      },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(22);
  });

  it("should increase quality for Backstage passes to a TAFKAL80ETC concert by 3  when there are 5 days or less", () => {
    const gildedRose = new GildedRose([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 20,
        sellIn: 5,
      },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(4);
    expect(gildedRose.items[0].quality).toBe(23);
  });

  it("should drop the quality to 0 after the concert for Backstage passes to a TAFKAL80ETC concert", () => {
    const gildedRose = new GildedRose([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 20,
        sellIn: 0,
      },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should update the quality of all the items", () => {
    const gildedRose = new GildedRose([
      {
        name: "Aged Brie",
        quality: 20,
        sellIn: 9,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 20,
        sellIn: 5,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 15,
        sellIn: 3,
      },
      {
        name: "+5 Dexterity Vest",
        quality: 4,
        sellIn: 0,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 7,
        sellIn: 9,
      },
      {
        name: "Aged Brie",
        quality: 10,
        sellIn: 8,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 48,
        sellIn: 10,
      },
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(8);
    expect(gildedRose.items[0].quality).toBe(21);
    expect(gildedRose.items[1].sellIn).toBe(4);
    expect(gildedRose.items[1].quality).toBe(23);
    expect(gildedRose.items[2].sellIn).toBe(3);
    expect(gildedRose.items[2].quality).toBe(15);
    expect(gildedRose.items[3].sellIn).toBe(-1);
    expect(gildedRose.items[3].quality).toBe(2);
    expect(gildedRose.items[4].sellIn).toBe(8);
    expect(gildedRose.items[4].quality).toBe(9);
    expect(gildedRose.items[5].sellIn).toBe(7);
    expect(gildedRose.items[5].quality).toBe(11);
    expect(gildedRose.items[6].sellIn).toBe(10);
    expect(gildedRose.items[6].quality).toBe(48);
  });
});
