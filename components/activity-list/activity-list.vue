<template>
    <view>
        <view v-if="(propData || null) != null && propData.length > 0">
            <block v-for="(goods, index) in propData" :key="index">
                <block>
                    <view class="floor-list wh-auto oh pr">
                        <view class="goods-list">
                            <!-- 商品主体内容 -->
                            <navigator :url="'/pages/goods-detail/goods-detail?id=' + goods.id" hover-class="none">
                                <image class="goods-img dis-block" :src="goods.pic" mode="aspectFit"></image>
                                <view class="goods-base padding-horizontal-main margin-top-sm">
                                    <view class="goods-title multi-text margin-bottom-sm">{{goods.name}}</view>
                                    <view class="sales-price">{{propCurrencySymbol}}{{goods.price}}</view>
                                </view>
                            </navigator>
                            <!-- 标签插件 -->
                            <view v-if="(propLabel || null) != null && propLabel.data.length > 0" :class="'plugins-label oh pa plugins-label-'+((propLabel.base.is_user_goods_label_icon || 0) == 0 ? 'text' : 'img')+' plugins-label-'+(propLabel.base.user_goods_show_style || 'top-left')">
                                <block v-for="(lv,li) in propLabel.data" :key="li">
                                    <view v-if="lv.goods_ids.indexOf(goods.id) != -1" class="lv dis-inline-block va-m" :data-value="((propLabel.base.is_user_goods_label_url || 0) == 1) ? (lv.url || '') : ''" @tap="url_event">
                                        <view v-if="(propLabel.base.is_user_goods_label_icon || 0) == 0" class="round cr-white bg-main text-size-xs fl" :style="((lv.bg_color || null) != null ? 'background-color:'+ lv.bg_color+' !important;' : '')+((lv.text_color || null) != null ? 'color:'+ lv.text_color+' !important;' : '')">{{lv.name}}</view>
                                        <image v-else class="dis-block" :src="lv.icon" mode="scaleToFill"></image>
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </block>
            </block>
        </view>
    </view>
</template>
<script>
    const app = getApp();

    export default {
        data() {
            return {};
        },
        components: {},
        props: {
            propCurrencySymbol: {
            	type: String,
            	default: app.globalData.data.currency_symbol
            },
            propLocation: {
            	type: [String,Number],
            	default: 0
            },
            propConfig: {
            	type: [String,Object],
            	default: null
            },
            propData: {
            	type: Array,
            	default: []
            },
            propLabel: {
            	type: [Array,Object,String],
            	default: null
            }
        },
        methods: {
            // url事件
            url_event(e) {
                app.globalData.url_event(e);
            }
        }
    };
</script>
<style>
</style>