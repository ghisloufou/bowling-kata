Nous te proposons de coder une app permettant de compter les points d'une partie
de bowling.\
Si tu ne connais pas bien ce jeu voici une page Wikipedia qui t’aidera
https://fr.wikipedia.org/wiki/Bowling#Scoring,\
sinon voici les spécifications :

## Specs

- A game is made up of 10 frames.
- Each frame has 10 pins and is reset each frame.
- A frame can be one or two rolls, depending on:
  - A strike (knocking all 10 pins down on the first roll of the frame) ends the
    frame.
  - Any number below 10 on the first roll allows a second roll.
  - A spare is defined as knocking all 10 pins down on the second roll of the
    frame.

- The final (or running) score is the sum of all frames where:
  - A strike is 10 points + the next two rolls.
  - A spare is 10 points + the next roll.
  - Anything else is 1 point per pin cleared in each roll.

- In the final (10th) frame:
  - If a spare is thrown, the player is awarded one more roll.\
    This roll awards the number of pins cleared onto their score (0 to 10 bonus
    points).
  - If a strike is thrown, the player is awarded two more rolls.\
    These rolls award the number of pins cleared onto their scores (0 to 20
    bonus points).

Le livrable à fournir est une CLI qui doit permettre de compter les points pour
un seul joueur :

Pour chaque lancé on rentre le nombre de quilles abattues (entre 0 et 10).

Entre chaque lancé on affiche le score avec le format suivant :

```
Frame       |  1|  2|  3|  4|  5|  6|  7|  8|  9|   10|
Frame score |4 /|1 0|  X|1 1|4 /|   |   |   |   |     |
Total score | 11| 12| 24| 26|   |   |   |   |   |     |
```

X indiquera un strike, / indiquera un spare.
