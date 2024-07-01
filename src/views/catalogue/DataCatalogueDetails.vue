<template>
    <div id="DataCatalogueDetails">
        <OpenPlatformHeader />
        <!-- 内容区 -->
        <CatalogueHead />
        <!-- 底部tab -->
        <!-- <CatalogueTabs /> -->
    </div>
</template>

<script>
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'
// import CatalogueTabs from '@views/catalogue/components/CatalogueTabs'
import CatalogueHead from '@views/catalogue/components/CatalogueHead'
    export default {
        name:'DataCatalogueDetails',
        components:{
            CatalogueHead,
            OpenPlatformHeader
            // CatalogueTabs
        }
    }
</script>

<style lang="less" scoped>
#DataCatalogueDetails{
    background: #F1F2F5;
}
</style>