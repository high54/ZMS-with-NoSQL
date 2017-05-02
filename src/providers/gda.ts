
import { services } from 'zetapush-js';

export class GdaProvider extends services.Macro {

    put(key,firstString, secondString) {
        this.$publish('put', {key, firstString, secondString });
    }
    get(key) {
        return this.$publish('get', { key });
    }


}
