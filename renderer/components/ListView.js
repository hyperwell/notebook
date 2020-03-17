import React from 'react'
import Link from 'next/link'
import styles from './ListView.module.css'

export default function ListView({items}) {
  return (
    <ul className={styles.list}>
      {items.map(({title, docUrl}, index) => (
        <li key={`item=${index}`} className={styles.item}>
          <Link href={`/directors/[slug]`} as={`/notebook/${docUrl}`}>
            <a className={styles.notebook} href={`/notebook/${docUrl}`}>
              <h5 className={styles.title}>{title}</h5>
              <em className={styles.meta}>{docUrl}</em>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
