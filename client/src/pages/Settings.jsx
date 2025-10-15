import styles from "./settings.module.css";

export default function Settings() {
  const settings = [
    { label: "Spending Time Period", value: "Monthly" },
    { label: "Budget Mode", value: "Off" },
    { label: "Carry Over", value: "On" },
    { label: "Hide Future Transactions", value: "Off" },
    { label: "Automatic Syncing", value: "Off" },
    { label: "Dropbox Sync", value: "Off" },
    { label: "User Interface Dark Theme", value: "On" },
    { label: "Show Transaction Note", value: "Off" },
    { label: "Currency Symbol", value: "₹" },
    { label: "Summary Font", value: "Chalk" },
    { label: "Category Icon Style", value: "Filled" },
    { label: "Tab Position", value: "Top" },
  ];

  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <ul className={styles.containerUl}>
        {settings.map((setting, index) => (
          <li key={index} className={styles.containerLi}>
            <span className={styles.settingLabel}>{setting.label}</span>
            <span className={styles.settingValue}>{setting.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
