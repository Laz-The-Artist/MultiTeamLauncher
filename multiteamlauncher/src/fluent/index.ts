import { FluentBundle, FluentResource } from '@fluent/bundle'

import { createFluentVue } from 'fluent-vue'

import EnUS from '../../public/res/locale/en_us.ftl';

const enUSBundle = new FluentBundle(["en-US", "en"])

enUSBundle.addResource(new FluentResource(EnUS))

const fluentVue = createFluentVue({
    bundles: [enUSBundle]
})

export default fluentVue;