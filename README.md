Nom : Ouarraki
Prénom : Mohammed Amine
Classe: E4DWM

Description du Projet
--Cette application est une API RESTful de gestion de commandes, elle permet de gérer des utilisateurs et leurs commandes, avec des fonctionnalites de creation, modification, et suppression de commandes. Les utilisateurs authentifies peuvent consulter et gerer leurs commandes, tandis qu’un administrateur dispose de droits étendus pour visualiser l'ensemble des commandes.

Les principales fonctionnalités mises en place sont :
--Craation de commandes : Permet a un utilisateur authentifie de creer une commande.
--Mise à jour et Suppression des commandes : Permet de modifier une commande existante.
--consultation de commandes : Permet de consulter des commandes.
--Pagination et filtres : Les commandes peuvent être listées par statut, avec la possibilité de paginer les résultats pour améliorer les performances.

Difficultes Rencontrees
--Mise à jour de commande (update) : L'implémentation de la fonction de mise à jour de commande a posé des problèmes,car il était nécessaire de ne mettre à jour que les champs spécifiés dans la requête (ex. : status ou totalAmount). Pour surmonter cette difficulté, des vérifications conditionnelles ont été ajoutées pour chaque champ, afin d'utiliser sql.placeholder() uniquement pour ceux à mettre à jour.