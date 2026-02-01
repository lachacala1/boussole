# Boussole PWA

Petite Progressive Web App : boussole optimisée mobile.

Prérequis : un serveur HTTP local (le navigateur bloque les capteurs sur `file://`).

Commandes rapides pour tester :

```bash
# Python 3
python -m http.server 8000
# puis ouvrir http://localhost:8000/project-boussole dans votre mobile ou émulateur
```

Points importants pour mobile :

- iOS (Safari) : depuis iOS 13+ il faut appeler `DeviceOrientationEvent.requestPermission()` depuis un évènement utilisateur (bouton). Appuyez sur «Activer la boussole». 
- Android (Chrome) : généralement fonctionne directement mais peut demander autorisations capteurs.
- Pour installer : ouvrir le site via HTTPS ou `localhost`, puis choisir "Ajouter à l'écran d'accueil" / installer.

Dépannage : si l'aiguille ne bouge pas, vérifier les autorisations capteurs et tester sur un vrai appareil (les émulateurs n'ont pas toujours les capteurs).