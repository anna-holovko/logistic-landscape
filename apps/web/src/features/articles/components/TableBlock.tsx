import { TableBlock as TableBlockType } from "../types";
import styles from "./blocks.module.css";

interface TableBlockProps {
  block: TableBlockType;
}

export function TableBlock({ block }: TableBlockProps) {
  return (
    <div className={styles.tableContainer}>
      {block.title && <h3 className={styles.tableTitle}>{block.title}</h3>}
      <table className={styles.table}>
        <thead>
          <tr>
            {block.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, idx) => (
            <tr key={idx}>
              {block.headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
