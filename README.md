# 🛒 E-commerce Cloud-Native: System Design & DevOps

**Stack Tecnologico:** `Java 21` · `Spring Boot 4.1.2` · `Gradle` · `PostgreSQL 15` · `Docker` · `Docker Compose` · `Kubernetes (Kind)` · `HTML/CSS/JS`

---

## 📖 Panoramica del Progetto

Questo progetto nasce con l'obiettivo di unire i principi teorici del **System Design** (progettazione di architetture scalabili) con le pratiche ingegneristiche del **DevOps e DevSecOps** (automazione, containerizzazione, orchestrazione e sicurezza).

Il risultato è un'applicazione e-commerce full-stack completa, progettata per essere eseguita in un ambiente **Cloud-Native** altamente resiliente.

---

## 🏗️ 1. Architettura del Sistema (System Design)

L'applicazione segue un'architettura a livelli (**Layered Architecture**), garantendo la separazione delle responsabilità:

* **Entity (`Product`):** Modella il dominio dati. Grazie a JPA (Hibernate), mappa automaticamente la classe Java su una tabella del database.
* **Repository (`ProductRepository`):** Estende `JpaRepository`, astraendo l'accesso ai dati. Elimina la necessità di scrivere query SQL manuali per le operazioni CRUD, mitigando di default vulnerabilità come la *SQL Injection*.
* **Controller (`ProductController`):** Espone le API REST (`/api/products`), coordinando la logica applicativa tra frontend e database.
* **Frontend:** Sviluppato in HTML, CSS e JavaScript puro. Segue il principio di *Separation of Concerns* (`index.html`, `style.css`, `app.js`). Comunica con il backend in modo asincrono tramite l'API `fetch`.

---

## 🐳 2. Containerizzazione e Orchestrazione Locale (Docker)

Per garantire la portabilità, il backend è stato containerizzato:

* **Multi-Stage Build:** Il `Dockerfile` utilizza un'immagine JDK per la compilazione (*Stage 1*) e un'immagine JRE più leggera per il runtime (*Stage 2*), riducendo la superficie d'attacco e la dimensione finale.
* **Docker Compose:** Utilizzato per orchestrare localmente l'applicazione Spring Boot e il database PostgreSQL, con un **Volume persistente** per garantire la conservazione dei dati al riavvio dei container.

---

## ☸️ 3. Orchestrazione Avanzata (Kubernetes)

Il deploy è stato effettuato su un cluster Kubernetes locale (creato tramite **Kind**), definendo manifesti dichiarativi (`YAML`):

* **Secrets:** Gestione sicura delle credenziali del database.
* **PersistentVolumeClaim (PVC):** Garantisce la persistenza dei dati PostgreSQL nel cluster.
* **Deployment & Service:** Configurazione di `1` replica per il DB e `2` repliche per l'applicazione. L'app comunica col DB tramite un `ClusterIP` interno e viene esposta all'esterno tramite un `NodePort`.
* **Self-Healing:** Kubernetes monitora costantemente i Pod. In caso di crash dell'applicazione, K8s riavvia automaticamente il container mantenendo la promessa delle 2 repliche, garantendo *zero downtime*.

---

## 🛡️ 4. Sicurezza e DevSecOps

In ottica **Shift-Left Security**, è stata condotta un'analisi pratica sulle API, simulando un attacco di tipo **SQL Injection**.

* **La Fallacia (Branch `security-lab`):** È stato implementato un endpoint (`/search-vulnerable`) che concatena direttamente l'input dell'utente nella query SQL. Inviando il payload `' OR 1=1 OR name='`, l'attaccante riesce a estrarre l'intero catalogo prodotti, bypassando i filtri.
* **La Mitigazione (Branch `main`):** Per risolvere la vulnerabilità, è stato introdotto un endpoint sicuro (`/search-safe`) che utilizza i **Prepared Statements** (segnaposto `?` gestiti da `JdbcTemplate`). Il payload viene trattato come stringa inerte, neutralizzando l'attacco.
* **Strategia Git:** Il codice vulnerabile è isolato nel branch `security-lab` a scopo didattico, mentre il branch `main` contiene solo il codice sicuro e pronto per la produzione.

---

## 🚀 5. Sviluppi Futuri

* [ ] **CI/CD:** Implementazione di pipeline *GitHub Actions* per automatizzare build, test, scansione di sicurezza (SAST) e deploy delle immagini su registry.
* [ ] **Cloud:** Migrazione del cluster locale su provider Cloud (es. Oracle OKE, Azure AKS) sfruttando i free tier.
* [ ] **Osservabilità:** Integrazione di *Prometheus* e *Grafana* nel cluster per il monitoraggio delle metriche di sistema (CPU, RAM, latenza API).
* [ ] **Event-Driven:** Introduzione di un message broker (es. *RabbitMQ*) per gestire la creazione degli ordini e l'invio asincrono delle email.