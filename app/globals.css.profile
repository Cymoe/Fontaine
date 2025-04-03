/* Profile Page Styles - Dark Theme */
.profile-page {
  background-color: #000000;
  color: white;
  min-height: 100vh;
  padding-bottom: 60px;
}

.profile-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: white;
  background-color: #000000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #2563eb;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Search bar */
.search-bar-container {
  padding: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 50px;
  padding: 8px 16px;
  width: 100%;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 8px 0;
  outline: none;
}

.search-bar input::placeholder {
  color: #9e9e9e;
}

.camera-button {
  background: none;
  border: none;
  color: #9e9e9e;
  margin: 0 12px;
  cursor: pointer;
}

.generate-button {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.generate-button:hover {
  background-color: #e0e0e0;
}

/* Notification banner */
.notification-banner {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 16px 24px;
  margin: 0 auto 32px;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-content h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.notification-content p {
  font-size: 14px;
  color: #9e9e9e;
  margin: 0;
}

.notification-content a {
  color: #ffffff;
  text-decoration: none;
}

.close-button {
  background: none;
  border: none;
  color: #9e9e9e;
  cursor: pointer;
  padding: 4px;
}

/* Profile container */
.profile-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Profile header */
.profile-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px;
  position: relative;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 32px;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.username {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px;
}

.display-name {
  font-size: 18px;
  font-weight: 400;
  color: #9e9e9e;
  margin: 0 0 16px;
}

.profile-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  gap: 4px;
}

.stat-value {
  font-weight: 600;
}

.stat-label {
  color: #9e9e9e;
}

.profile-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.add-bio-button,
.add-location-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: white;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
}

.join-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9e9e9e;
  font-size: 14px;
}

.edit-profile-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-profile-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Profile tabs */
.profile-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 32px;
}

.tab-button {
  background: none;
  border: none;
  color: #9e9e9e;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-button:hover {
  color: white;
}

.tab-button.active {
  color: white;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: white;
}

/* Profile content */
.profile-content {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-content-message {
  color: #9e9e9e;
  text-align: center;
  font-size: 16px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-avatar {
    margin-right: 0;
    margin-bottom: 24px;
  }

  .profile-stats {
    justify-content: center;
  }

  .profile-actions {
    flex-direction: column;
    align-items: center;
  }

  .edit-profile-button {
    position: static;
    margin-top: 24px;
  }
}

/* Profile Page Styles */
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.profile-container.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #2563eb;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.profile-header {
  margin-bottom: 40px;
  text-align: center;
}

.profile-header h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.profile-header p {
  font-size: 16px;
  color: #666;
}

.profile-content {
  display: flex;
  gap: 40px;
}

.profile-sidebar {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 24px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.profile-avatar:hover .avatar-overlay {
  opacity: 1;
}

.change-avatar-btn {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
}

.profile-info {
  text-align: center;
  margin-bottom: 32px;
}

.profile-info h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.profile-info p {
  color: #666;
  margin-bottom: 8px;
}

.profile-info .company,
.profile-info .role {
  font-size: 14px;
}

.profile-navigation {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-navigation .nav-item {
  padding: 12px 16px;
  border-radius: 8px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
}

.profile-navigation .nav-item:hover {
  background-color: #f5f5f5;
}

.profile-navigation .nav-item.active {
  background-color: #f0f7ff;
  color: #2563eb;
  font-weight: 500;
}

.profile-form-container {
  flex: 1;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.input-help {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  gap: 16px;
}

.save-btn {
  padding: 12px 24px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #1d4ed8;
}

.save-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.cancel-btn {
  padding: 12px 24px;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
}

/* Responsive styles for profile page */
@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
  }
  
  .profile-sidebar {
    flex: none;
    width: 100%;
    margin-bottom: 32px;
  }
  
  .profile-form-container {
    width: 100%;
  }
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a1a1a;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.modal-header .close-button {
  background: none;
  border: none;
  color: #9e9e9e;
  cursor: pointer;
  padding: 4px;
}

.modal-content form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #9e9e9e;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  background-color: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: white;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #2563eb;
}

.form-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-button {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.save-button {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: #1d4ed8;
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
