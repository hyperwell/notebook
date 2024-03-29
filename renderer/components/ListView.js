import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import styles from './ListView.module.css'

export default function ListView({items}) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hyperwell</h1>

      <div className={styles.section}>
        <h6>Search</h6>
        <div className={styles.searchWrapper}>
          <input type="text" className={styles.search} />
        </div>
      </div>

      <div className={styles.section}>
        <h6>Notebooks</h6>
        <ul className={styles.list}>
          {items.map(({name, docUrl, lastChangeDate}, index) => {
            const active =
              router.asPath === `/notebook?url=${encodeURIComponent(docUrl)}`

            return (
              <li key={`item-${index}`} className={styles.item}>
                <Link href={`/notebook?url=${encodeURIComponent(docUrl)}`}>
                  <a
                    className={`${styles.notebook} ${
                      active ? styles.active : ''
                    }`}
                    href={`/notebook?url=${encodeURIComponent(docUrl)}`}
                  >
                    <span className={styles.name}>{name}</span>

                    {lastChangeDate && (
                      <span className={styles.changeIndicator} />
                    )}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
