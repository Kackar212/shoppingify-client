import styles from "./statistics-ranking.module.scss";

interface StatisticsRankingProps {
  data: Array<{ name: string; value: number }>;
  type: string;
}

export function StatisticsRanking({ data, type }: StatisticsRankingProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Top {type}</h2>
      {data.map(({ name, value }) => (
        <div key={name} className={styles.item}>
          <span className={styles.label}>
            <span className={styles.name}>{name}</span>{" "}
            {Math.trunc(value * 100)}%
          </span>
          <div
            style={{ "--progress": value }}
            className={styles.progressBar}
          ></div>
        </div>
      ))}
    </section>
  );
}
