<template>
    <view>
        <view class="copyright">
            <view class="text">Powered by ShopXO {{version}}</view>
        </view>
    </view>
</template>
<script>
    const app = getApp();
    export default {
        data() {
            return {
                version: app.globalData.data.version
            };
        },
        components: {},
        props: {},
        methods: {}
    };
</script>
<style>
    .copyright {
        color: #cfcfcf;
        text-align: center;
        padding: 20rpx 0;
    }
    .copyright .text {
        font-size: 26rpx;
        font-weight: 400;
    }
</style>