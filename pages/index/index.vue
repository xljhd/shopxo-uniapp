<template>
    <view>
        <view :class="((plugins_mourning_data || 0) == 1 ? ' grayscale' : '')+(is_single_page == 1 ? ' single-page-top' : '')">
            <!-- 顶部内容 -->
            <view  class="home-top-nav-content" :style="top_content_style">
                <!-- 标题 -->
                <view class="home-top-nav-title cr-white single-text">{{application_title}}</view>

                <!-- 搜索 -->
                <view v-if="search_is_fixed == 1" class="search-fixed-seat"></view>
                <view v-if="load_status == 1" :class="'pr '+(search_is_fixed == 1 ? 'search-content-fixed bg-main' : '')" :style="search_is_fixed == 1 ? top_content_style : ''">
                    <view :style="search_style">
                        <view class="margin-horizontal-main">
                            <component-search propPlaceholder="输入商品名称搜索" propBgColor="#fff"></component-search>
                        </view>
                    </view>
                </view>

                <!-- 轮播 -->
                <view class="banner-content padding-horizontal-main" v-if="banner_list.length > 0">
                    <component-banner :propData="banner_list"></component-banner>
                </view>
            </view>

            <!-- 内容 -->
            <!-- 内容 -->
            <view class="content padding-horizontal-main">
               <view v-for="(floor, index) in data_list" :key="index" class="floor">
                                    
                   <view class="floor-list wh-auto oh pr">
                   
                       <view v-if="floor.length > 0" class="goods-list">
                           <view v-for="(goods, index2) in floor" :key="index2" class="goods bg-white border-radius-main oh pr">
                               <!-- 商品主体内容 -->
                               <navigator :url="'/pages/goods-detail/goods-detail?id=' + goods.id" hover-class="none">
                                   <image class="goods-img dis-block" :src="goods.pic" mode="aspectFit"></image>
                                   <view class="goods-base padding-horizontal-main margin-top-sm">
                                       <view class="goods-title multi-text margin-bottom-sm">{{goods.name}}</view>
                                       <view class="sales-price">{{currency_symbol}}{{goods.price}}</view>
                                   </view>
                               </navigator>
                               <!-- 标签插件 -->
                              <!-- <view v-if="(plugins_label_data || null) != null && plugins_label_data.data.length > 0" :class="'plugins-label oh pa plugins-label-'+((plugins_label_data.base.is_user_goods_label_icon || 0) == 0 ? 'text' : 'img')+' plugins-label-'+(plugins_label_data.base.user_goods_show_style || 'top-left')">
                                   <block v-for="(lv,li) in plugins_label_data.data" :key="li">
                                       <view v-if="lv.goods_ids.indexOf(goods.id) != -1" class="lv dis-inline-block va-m" :data-value="((plugins_label_data.base.is_user_goods_label_url || 0) == 1) ? (lv.url || '') : ''" @tap="url_event">
                                           <view v-if="(plugins_label_data.base.is_user_goods_label_icon || 0) == 0" class="round cr-white bg-main text-size-xs fl" :style="((lv.bg_color || null) != null ? 'background-color:'+ lv.bg_color+' !important;' : '')+((lv.text_color || null) != null ? 'color:'+ lv.text_color+' !important;' : '')">{{lv.name}}</view>
                                           <image v-else class="dis-block" :src="lv.icon" mode="scaleToFill"></image>
                                       </view>
                                   </block>
                               </view> -->
                           </view>
               			
                       </view>
                   </view>  
               </view>
            </view>
            
            <!-- 提示信息 -->
         <!--   <block v-if="load_status == 0">
                <component-no-data :propStatus="data_list_loding_status" :propMsg="data_list_loding_msg"></component-no-data>
            </block> -->
            
            <!-- 结尾 -->
            <component-bottom-line :propStatus="data_bottom_line_status"></component-bottom-line>
            
            <!-- 版权信息 -->
            <view v-if="load_status == 1">
                <component-copyright></component-copyright>
            </view>
        </view>

    </view>
</template>

<script>
    const app = getApp();
    import componentSearch from "../../components/search/search";
    import componentQuickNav from "../../components/quick-nav/quick-nav";
    import componentIconNav from "../../components/icon-nav/icon-nav";
    import componentBanner from "../../components/slider/slider";
    import componentCountdown from "../../components/countdown/countdown";
    import componentLayout from "../../components/layout/layout";
    import componentBadge from "../../components/badge/badge";
    import componentNoData from "../../components/no-data/no-data";
    import componentBottomLine from "../../components/bottom-line/bottom-line";
    import componentCopyright from "../../components/copyright/copyright";
    import componentOnlineService from "../../components/online-service/online-service";
    import componentActivityList from "../../components/activity-list/activity-list";
    import componentBlogList from "../../components/blog-list/blog-list";

    var common_static_url = app.globalData.get_static_url('common');
    var static_url = app.globalData.get_static_url('home');
    var bar_height = parseInt(app.globalData.get_system_info('statusBarHeight', 0));
    export default {
        data() {
            return {
                common_static_url: common_static_url,
                static_url: static_url,
                data_list_loding_status: 1,
                data_list_loding_msg: '',
                data_bottom_line_status: false,
                load_status: 0,
                currency_symbol: app.globalData.data.currency_symbol,
                data_list: [],
                banner_list: [],
                navigation: [],
                article_list: [],
                cart_total: 0,
                message_total: 0,
                right_icon_list: [],
                // 基础配置
                common_shop_notice: null,
                home_index_floor_data_type: 0,
                common_app_is_enable_search: 0,
                common_app_is_enable_answer: 0,
                common_app_is_header_nav_fixed: 0,
                common_app_is_online_service: 0,
                // 名称
                application_title: app.globalData.data.application_title,
                // 顶部+搜索样式配置
                top_content_style: 'background-image: url("'+static_url+'nav-top.png");'+'padding-top:'+(bar_height+8)+'px;',
                search_style: '',
                search_is_fixed: 0,
                // 是否单页预览
                is_single_page: app.globalData.is_current_single_page() || 0,
                // 限时秒杀插件
                plugins_seckill_is_valid: 0,
                plugins_seckill_data: null,
                // 购买记录插件
                plugins_salerecords_data: null,
                // 活动配置插件
                plugins_activity_data: null,
                // 标签插件
                plugins_label_data: null,
                // 首页中间广告插件
                plugins_homemiddleadv_data: null,
                // 弹屏广告、这里设置一天后可以再次显示
                plugins_popupscreen_data: null,
                plugins_popupscreen_status: 0,
                plugins_popupscreen_cache_key: 'plugins_popupscreen_cache_key',
                plugins_popupscreen_timer: null,
                // 哀悼灰度插件
                plugins_mourning_data: 0,
                // 标签插件
                plugins_blog_data: null
            };
        },

        components: {
            componentSearch,
            componentQuickNav,
            componentIconNav,
            componentBanner,
            componentCountdown,
            componentLayout,
            componentBadge,
            componentNoData,
            componentBottomLine,
            componentCopyright,
            componentOnlineService,
            componentActivityList,
            componentBlogList
        },
        props: {},

        onShow() {
            // 数据加载
            this.init();

            // 初始化配置
            this.init_config();
        },

        // 下拉刷新
        onPullDownRefresh() {
            this.init();
        },

        methods: {
            // 初始化配置
            init_config(status) {
                if ((status || false) == true) {
                    this.setData({
                        currency_symbol: app.globalData.get_config('currency_symbol'),
                        common_shop_notice: app.globalData.get_config('config.common_shop_notice'),
                        home_index_floor_data_type: app.globalData.get_config('config.home_index_floor_data_type'),
                        common_app_is_enable_search: app.globalData.get_config('config.common_app_is_enable_search'),
                        common_app_is_enable_answer: app.globalData.get_config('config.common_app_is_enable_answer'),
                        common_app_is_header_nav_fixed: app.globalData.get_config('config.common_app_is_header_nav_fixed'),
                        common_app_is_online_service: app.globalData.get_config('config.common_app_is_online_service')
                    });
                } else {
                    app.globalData.is_config(this, 'init_config');
                }
            },

            // 获取数据
            init() {
                this.setData({
                    data_list_loding_status: 1
                });
		
				this.$api.productList({pageNum:1,pageSize:30}).then(res => {
					this.data_list = [res.data.list];
				});
				
				this.$api.bannerList().then(res => {
					console.log(res)
					this.setData({
						banner_list:res.data.list || []
					});
					
				});
           
            },
            
            // 页面滚动监听
            onPageScroll(e) {
                var top = e.scrollTop > 35 ? 35 : e.scrollTop;
                var num = top*7;
                var base = 230;
                // #ifdef MP-ALIPAY
                    base = 235
                // #endif
                // #ifdef H5 || APP
                    var len = (this.right_icon_list || []).length;
                    base = (len <= 0) ? 0 : 66*len;
                // #endif
                // 开启哀悼插件的时候不需要浮动导航并且搜索框也不需要缩短、开启站点灰度会导致浮动失效
                if((this.plugins_mourning_data || 0) != 1) {
                    var val = (num > base) ? base : num;
                    this.setData({
                        search_style: 'width: calc(100% - '+val+'rpx);',
                        search_is_fixed: (top >= 35) ? 1 : 0,
                    });
                }
            },
            
            // url事件
            url_event(e) {
                app.globalData.url_event(e);
            },
            
            // 弹屏广告插件处理
            plugins_popupscreen_handle() {
                if(this.plugins_popupscreen_data != null) {
                    // 不存在关闭缓存或者超过间隔时间则显示
                    var cv = parseInt(uni.getStorageSync(this.plugins_popupscreen_cache_key)) || 0;
                    var pv = parseInt(this.plugins_popupscreen_data.interval_time) || 86400;
                    if(cv == 0 || cv+pv < app.globalData.get_timestamp()) {
                        // 是否开启自动关闭
                        var timer = null;
                        var ct = parseInt(this.plugins_popupscreen_data.close_time) || 0;
                        if(ct > 0) {
                            var self = this;
                            timer = setTimeout(function() {
                                self.setData({
                                    plugins_popupscreen_status: 0
                                });
                                uni.setStorage({
                                    key: self.plugins_popupscreen_cache_key,
                                    data: app.globalData.get_timestamp()
                                });
                            }, ct*1000);
                        }
                        this.setData({
                            plugins_popupscreen_status: 1,
                            plugins_popupscreen_timer: timer
                        });
                    }
                }
            },
            
            // 弹屏广告 - 插件 关闭事件
            plugins_popupscreen_close_event(e) {
                this.setData({
                    plugins_popupscreen_status: 0,
                });
                uni.setStorage({
                    key: this.plugins_popupscreen_cache_key,
                    data: app.globalData.get_timestamp()
                });
                clearInterval(this.plugins_popupscreen_timer);
            }
        }
    };
</script>
<style>
    @import './index.css';
</style>