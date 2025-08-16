# Portfolio Website with CMS - API Endpoints

## 1. Authentication & User Management
| Method | Endpoint           | Description                             | Auth Required |
|--------|--------------------|-----------------------------------------|--------------|
| POST   | `/api/auth/register` | Register a new CMS admin *(only for initial setup)* | ❌ |
| POST   | `/api/auth/login`    | Login and get JWT token                 | ❌ |
| POST   | `/api/auth/logout`   | Logout the current user                 | ✅ |
| GET    | `/api/auth/me`       | Get current logged-in user details      | ✅ |

---

## 2. Project Management
| Method | Endpoint               | Description              | Auth Required |
|--------|------------------------|--------------------------|--------------|
| GET    | `/api/projects`        | Get all projects         | ❌ |
| GET    | `/api/projects/:id`    | Get project by ID        | ❌ |
| POST   | `/api/projects`        | Add a new project        | ✅ |
| PUT    | `/api/projects/:id`    | Update project details   | ✅ |
| DELETE | `/api/projects/:id`    | Delete a project         | ✅ |

---

## 3. Blog Management
| Method | Endpoint               | Description              | Auth Required |
|--------|------------------------|--------------------------|--------------|
| GET    | `/api/blogs`           | Get all blog posts       | ❌ |
| GET    | `/api/blogs/:id`       | Get single blog post     | ❌ |
| POST   | `/api/blogs`           | Create a new blog post   | ✅ |
| PUT    | `/api/blogs/:id`       | Update blog post         | ✅ |
| DELETE | `/api/blogs/:id`       | Delete blog post         | ✅ |

---

## 4. Contact Form
| Method | Endpoint               | Description                  | Auth Required |
|--------|------------------------|------------------------------|--------------|
| POST   | `/api/contact`         | Submit a contact form        | ❌ |
| GET    | `/api/contact`         | View all contact messages    | ✅ |
| DELETE | `/api/contact/:id`     | Delete a contact message     | ✅ |

---

## 5. Theme & Settings
| Method | Endpoint               | Description                  | Auth Required |
|--------|------------------------|------------------------------|--------------|
| GET    | `/api/settings/theme`  | Get current theme settings   | ❌ |
| PUT    | `/api/settings/theme`  | Update theme settings        | ✅ |

---

## 6. CMS Dashboard Data
| Method | Endpoint                   | Description                                           | Auth Required |
|--------|----------------------------|-------------------------------------------------------|--------------|
| GET    | `/api/dashboard/overview`  | Get quick stats *(project count, blog count, inquiries)* | ✅ |
