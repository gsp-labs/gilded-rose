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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].categoryName != CATEGORY_AGED_BRIE &&
        this.items[i].categoryName != CATEGORY_BACKSTAGE_PASSES
      ) {
        if (this.items[i].quality > MINIMUM_QUALITY) {
          if (this.items[i].categoryName != CATEGORY_SULFARAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < MAXIMUM_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].categoryName == CATEGORY_BACKSTAGE_PASSES) {
            if (this.items[i].sellIn <= BACKSTAGE_PASSES_L1) {
              if (this.items[i].quality < MAXIMUM_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn <= BACKSTAGE_PASSES_L2) {
              if (this.items[i].quality < MAXIMUM_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].categoryName != CATEGORY_SULFARAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].categoryName != CATEGORY_AGED_BRIE) {
          if (this.items[i].categoryName != CATEGORY_BACKSTAGE_PASSES) {
            if (this.items[i].quality > MINIMUM_QUALITY) {
              if (this.items[i].categoryName != CATEGORY_SULFARAS) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < MAXIMUM_QUALITY) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
