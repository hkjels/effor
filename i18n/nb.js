
/**
 * Module dependencies.
 */

var Language = require('lingo').Language;


module.exports = function (app) {

  /**
   * Norwegian.
   */

  var nb = new Language('nb', 'Norwegian');

  /**
   * Translations.
   */

  nb.translations = {
    'Add article': 'Legg til artikkel',
    'Login': 'Logg inn',
    'Log out': 'Logg ut',
    'E-mail': 'E-post',
    'Added': 'Lagt til',
    'Articles': 'Artikkler',
    'Published': 'Publisert',
    'Password': 'Passord',
    'Online': 'Pålogget',
    'Title': 'Tittel',
    'Path': 'Sti',
    'Appear in menu': 'Synlig i menyen',
    'Create page': 'Lag ny side',
    'Update page': 'Oppdater side',
    'Fullname': 'Fullt navn',
    'Firstname': 'Fornavn',
    'Lastname': 'Etternavn',
    'Publisher': 'Utgiver',
    'Editor': 'Redigerer',
    'Add user': 'Legg til bruker',
    'You successfully updated the article titled {title}.': 'Du har oppdatert artikkelen med tittel {title}',
    'You´ve successfylly added a new article titled {title}.': 'Du har lagt til en ny artikkel med tittelen {title}',
    'Update user': 'Oppdater bruker'
  };

  return nb;

};

