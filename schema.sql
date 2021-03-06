CREATE TABLE IF NOT EXISTS collections (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  external_id VARCHAR(128) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  records INT UNSIGNED,
  images INT UNSIGNED,
  indexed BOOLEAN NOT NULL DEFAULT 0,
  repository_id INT UNSIGNED NOT NULL,
  added DATE,
  updated DATE,
  removed DATE,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_scraped DATETIME,
  PRIMARY KEY (id),
  UNIQUE KEY (external_id, repository_id),
  KEY (added),
  KEY (updated),
  KEY (removed),
  KEY (repository_id)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS repositories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  homepage TEXT NOT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
