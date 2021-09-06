import { FluentBundle, FluentResource } from '@fluent/bundle'

import { createFluentVue } from 'fluent-vue'

import EnUS from '../../public/res/locale/en_us.ftl';
import FrFR from '../../public/res/locale/fr_fr.ftl'

const enUSBundle = new FluentBundle(["en-US", "en"])
const frFRBundle = new FluentBundle(["fr-FR", "fr"])

enUSBundle.addResource(new FluentResource(EnUS))
frFRBundle.addResource(new FluentResource(FrFR))

const fluentVue = createFluentVue({
    bundles: [enUSBundle, frFRBundle]
})

export default fluentVue;