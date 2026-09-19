'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, fetchProducts, FALLBACK_PRODUCTS, type AppLinks } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { StarIcon, ArrowRightIcon } from './Icons';
import styles from './ProductCatalog.module.css';

interface ProductCatalogProps {
  products?: Product[];
  initialProducts?: Product[];
  links?: AppLinks;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products: pList, initialProducts }) => {
  const initial = (pList && pList.length > 0) ? pList : ((initialProducts && initialProducts.length > 0) ? initialProducts : FALLBACK_PRODUCTS);
  const [products, setProducts] = useState<Product[]>(initial);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!pList || pList.length === 0) {
      fetchProducts().then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      });
    }
  }, [pList]);

  return (
    <section id="shop" className={`section ${styles.catalogSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-teal">Direct Central Catalog</span>
          <h2 className={styles.title}>Shop Standard Individual Packs</h2>
          <p className={styles.subtitle}>
            Prefer single size packs? All packs come with 6 individually sealed pads with discreet disposal wrappers. Synchronized live with our warehouse catalog.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((prod) => (
            <div key={prod.id} className={styles.productCard}>
              {prod.banner_tag && (
                <div className={styles.bannerTag}>{prod.banner_tag}</div>
              )}

              <div className={styles.imageWrapper}>
                <Image
                  src={prod.image_url || '/images/home_product_pad.png'}
                  alt={prod.name}
                  width={340}
                  height={240}
                  className={styles.productImage}
                />
                <span className={styles.sizePill}>{prod.size}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.ratingRow}>
                  <div className={styles.stars}>
                    <StarIcon size={14} color="#D97706" />
                    <span>{prod.rating}</span>
                  </div>
                  <span className={styles.reviewCount}>({prod.reviews_count} reviews)</span>
                </div>

                <h3 className={styles.productName}>{prod.name}</h3>
                <p className={styles.productDesc}>{prod.description}</p>

                <div className={styles.highlightsList}>
                  {prod.highlights?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className={styles.highlightItem}>
                      <span className={styles.dotIcon}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.footerRow}>
                  <div className={styles.priceGroup}>
                    <span className={styles.currentPrice}>₹{prod.price}</span>
                    <span className={styles.packNotice}>Pack of 6</span>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(prod, 1)}
                    disabled={prod.is_upcoming}
                  >
                    {prod.is_upcoming ? 'Coming soon' : '+ Add to Bag'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.boxCallout}>
          <div className={styles.calloutLeft}>
            <span className="badge badge-coral">Pro-Tip for Complete Comfort</span>
            <h3>Need a mix of sizes for your full cycle?</h3>
            <p>
              Build one custom box with Double XL, Extra Long and Large pads for day-to-night peace of mind.
            </p>
          </div>
          <a href="#custom-box" className="btn btn-secondary btn-lg">
            <span>Build Custom Box</span>
            <ArrowRightIcon size={16} color="#0D6B5B" />
          </a>
        </div>
      </div>
    </section>
  );
};
