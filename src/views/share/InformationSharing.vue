<template>
  <div id="informationSharing">
    <OpenPlatformHeader />
    <InformationHead />
  </div>
</template>

<script>
import InformationHead from '@views/share/components/InformationHead'
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'

export default {
  name: 'informationsharing',
  components: {
    OpenPlatformHeader,
    InformationHead,
  },
}
</script>

<style lang="scss" scoped>
#informationSharing {
  height: 100%;
  background: #f0f2f5;
}
</style>