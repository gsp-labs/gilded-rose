type Item = {
  categoryName: string;
  sellIn: number;
  quality: number;
};

const CATEGORY_AGED_BRIE = "Aged Brie";
const CATEGORY_BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const CATEGORY_SULFARAS = "Sulfuras, Hand of Ragnaros";

const MINIMUM_QUALITY = 0;
const MAXIMUM_QUALITY = 50;

const BACKSTAGE_PASSES_L1 = 10;
const BACKSTAGE_PASSES_L2 = 5;
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  decreaseQuality(item: Item) {
    return item.quality - 1;
  }

  increaseQuality(item: Item) {
    return item.quality + 1;
  }

  getQualityForExpiredItem(item: Item): number {
    if (item.sellIn < 0) return item.quality;

    if (item.categoryName === CATEGORY_BACKSTAGE_PASSES) return MINIMUM_QUALITY;

    if (
      item.quality > MINIMUM_QUALITY &&
      item.categoryName != CATEGORY_SULFARAS
    )
      return this.decreaseQuality(item);

    if (
      item.categoryName === CATEGORY_AGED_BRIE &&
      item.quality < MAXIMUM_QUALITY
    )
      return this.increaseQuality(item);

    return item.quality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].categoryName != CATEGORY_AGED_BRIE &&
        this.items[i].categoryName != CATEGORY_BACKSTAGE_PASSES
      ) {
        if (this.items[i].quality > MINIMUM_QUALITY) {
          if (this.items[i].categoryName != CATEGORY_SULFARAS) {
            this.items[i].quality = this.decreaseQuality(this.items[i]);
          }
        }
      } else {
        if (this.items[i].quality < MAXIMUM_QUALITY) {
          this.items[i].quality = this.increaseQuality(this.items[i]);
          if (this.items[i].categoryName == CATEGORY_BACKSTAGE_PASSES) {
            if (this.items[i].sellIn <= BACKSTAGE_PASSES_L1) {
              if (this.items[i].quality < MAXIMUM_QUALITY) {
                this.items[i].quality = this.increaseQuality(this.items[i]);
              }
            }
            if (this.items[i].sellIn <= BACKSTAGE_PASSES_L2) {
              if (this.items[i].quality < MAXIMUM_QUALITY) {
                this.items[i].quality = this.increaseQuality(this.items[i]);
              }
            }
          }
        }
      }

      if (this.items[i].categoryName != CATEGORY_SULFARAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      this.items[i].quality = this.getQualityForExpiredItem(this.items[i]);
    }

    return this.items;
  }
}
