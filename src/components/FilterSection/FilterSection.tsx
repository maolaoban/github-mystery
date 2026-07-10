import { useTranslation } from "react-i18next";
import { useStore } from "../../store/useStore";
import { Icon } from "../Icon/Icon";
import styles from "./FilterSection.module.css";

const LANGUAGES = [
  { value: "", labelKey: "filter.all" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TypeScript" },
  { value: "rust", label: "Rust" },
  { value: "c++", label: "C++" },
  { value: "c#", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "vue", label: "Vue" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
];

export function FilterSection() {
  const { t } = useTranslation();
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);

  return (
    <div className={styles.filterSection}>
      <div className={styles.filterGroup}>
        <label>
          <Icon name="code" size={13} /> {t("filter.language")}
        </label>
        <select
          value={filters.language}
          onChange={(e) => setFilters({ language: e.target.value })}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.labelKey ? t(lang.labelKey) : lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>
          <Icon name="user-plus" size={13} /> {t("filter.minFollowers")}
        </label>
        <input
          type="number"
          value={filters.minFollowers ?? ''}
          min={0}
          step={1}
          onChange={(e) =>
            setFilters({ minFollowers: e.target.value === '' ? undefined : parseInt(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
