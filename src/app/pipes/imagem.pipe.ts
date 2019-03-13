import { URL_SERVICOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagem'
})
export class ImagemPipe implements PipeTransform {

    transform( img: string, tipo: string = 'usuario'): any {

        let url = URL_SERVICOS + '/img';
    
        if ( !img ) {
          return url + '/usuarios/xxx';
        }
    
        if ( img.indexOf('https') >= 0 ) {
          return img;
        }
    
        switch ( tipo ) {
    
          case 'usuario':
            url += '/usuarios/' + img;
          break;
    
          case 'medico':
            url += '/medicos/' + img;
          break;
    
          case 'hospital':
             url += '/hospitais/' + img;
          break;
    
          default:
            console.log('Tipo de imagem nçao existe, usuario, medicos, hospitais');
            url += '/usurios/xxx';
        }
    
        return url;
      }
    
    }
    