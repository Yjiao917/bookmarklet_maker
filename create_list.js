// Generate deltoid links

'use strict';

// eslint-disable-next-line fb-www/complexity
(function () {
  const SECONDS_IN_DAYS = 60 * 60 * 24;

  const type =
    document.querySelectorAll('._7mgb [aria-pressed="true"]')[0].innerText ===
    'QE'
      ? 'qe'
      : 'gk';
  const experimentInfo = Array.from(
    document.querySelectorAll('._7mgb input'),
  ).map(input => input.value);
  const experiments = [
    {
      control: type === 'qe' ? experimentInfo[2] : experimentInfo[3],
      experiment: type === 'qe' ? experimentInfo[0] : experimentInfo[0],
      test: type === 'qe' ? experimentInfo[1] : experimentInfo[1],
      type,
    },
  ];

  const endTime = prompt('End date (M-D-Y):');

  const metrics = [
    {
      collections: ['search:growth'],
      filters: [],
    },
    {
      collections: [],
      filters: [],
      label: 'search:growth - DAP, MAP, etc',
      metricNames: [
        'search:dap:overall',
        'search:l1_retention:overall',
        'search:l7_retention:overall',
        'search:map:overall',
        'search:typeahead_overall:dap:overall',
        'search:typeahead_overall:l1_retention:overall',
        'search:typeahead_overall:l7_retention:overall',
        'search:typeahead_overall:wap:overall',
        'search:wap:overall',
      ],
      platformFilter: false,
    },
    {
      collections: [],
      filters: [],
      label: 'search:growth - Active Days and Volume',
      metricNames: [
        'search:usage:active_days:typeahead',
        'search:usage:sessions:typeahead',
        'search:usage:volume:by_search_product',
        'search:usage:volume:overall',
        'search:usage:volume:serp:by_is_typeahead_referred',
        'search:usage:volume:ta_referred_serp:by_is_classifier_post_search',
        'search:usage:volume_without_mp_watch:overall',
        'search:usage:volume_without_mp_watch:has_reformulation',
        'search:typeahead:sessions_search_glyph:overall',
        'search:usage:non_people_search_volume:overall',
      ],
      platformFilter: true,
      platformFiltersOnly: true,
    },
    {
      collections: [],
      filters: [],
      label: 'search:growth - Participation',
      metricNames: [
        'search:usage:participation:by_search_product',
        'search:usage:participation:overall_search',
        'search:usage:participation:serp:by_is_typeahead_referred',
        'search:usage:participation:ta_referred_serp:by_is_classifier_post_search',
        'search:usage:participation:typeahead',
      ],
      platformFilter: true,
      platformFiltersOnly: false,
    },
    {
      collections: [],
      filters: [],
      label: 'search:typeahead:topline',
      metricNames: [
        'search:typeahead:ctr:with_typed_kp_no_scope',
        'search:conduit:ta:avg_chars_typed:with_typed_kp_no_abandon_no_scope',
        'search:typeahead:non_echo_ctr:with_typed_kp_no_scope',
        'search:ta_quality:online_bvt_non_echo_ctr:global',
        'search:typeahead:perf:avg_blended_wall_time:overall',
        'search:ta_quality:online_bvt_typed_query_ratio:global',
        'search:ta_quality:online_bvt_non_echo_ctr:gtakp',
        'search:tas_imp:unintuitive_imp_session_rate:uir_eligible_with_global_scope',
        'search:typeahead:abandon_rate:with_typed_kp_no_scope',
      ],
      platformFilter: true,
    },
    {
      collections: ['search:typeahead:sts_v1'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: ['search:typeahead:sts_v1:detail'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: ['search:sequences_topline'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: ['search:serp'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: [],
      filters: [
        {
          column: 'filter_type',
          mode: 2,
          values: ['marketplace_tab', 'blended_shows_home'],
        },
      ],
      label: 'SERP - non-MP/Watch',
      collections: ['search:serp'],
      metricNames: [
        'search:serp:15s_sessions:overall',
      ],
      platformFilter: true,
    },
    {
      collections: [],
      filters: [
        {
          column: 'filter_type',
          mode: 1,
          values: ['top'],
        },
      ],
      label: 'SERP - Top Tab',
      collections: ['search:serp'],
      metricNames: [
        'search:serp:15s_sessions:overall',
      ],
      platformFilter: true,
    },
    {
      collections: ['search:serp_clicks'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: ['search:value:overview'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: [],
      filters: [],
      label: 'Desktop SERP Perf',
      metricNames: [
        'performance:hcgf:search:comet_www:navigate_to_top_tab_serp:web_display_done:avg_when_success',
        'performance:hcgf:search:comet_www:navigate_to_top_tab_serp:web_display_done:pct_good_when_success_contingent',
      ],
      platformFilter: false,
    },
    {
      collections: ['search:capacity'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['search:polished_usecase'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: ['search:search_news_topline'],
      filters: [],
      metricNames: [],
      platformFilter: true,
    },
    {
      collections: ['core_app:web_topline'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['core_app:comet_ecosystem_metrics'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['core_app:comet_product_engagement'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['groups:common'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['groups:common_detailed'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['groups:tab_common'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['events:common'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: ['search:pages_bvi_h2_2020'],
      filters: [],
      metricNames: [],
      platformFilter: false,
    },
    {
      collections: [],
      filters: [],
      label: 'Partner Metrics',
      metricNames: [
        'local:usr_bvi_value_v2:search_referred',
        'groups:growth:cedau:overall',
        'video:planned_viewing:video_home_watch_time_ms:overall',
        'video:search:metrics:participation_rate:organic_search_explore',
        'search:friending:requests_sent_accepted:overall',
        'marketplace:bsg_mli_fast:overall',
        'marketplace:search:mp_tab_search_mli_global_search_overall:overall',
        'groups:meaningfulness:meaningful_joins:by_source',
      ],
      platformFilter: false,
    },
    {
      collections: [],
      filters: [
        {
          column: 'filter_type',
          mode: 1,
          values: ['photo', 'blended_photo'],
        },
      ],
      label: 'Photos',
      metricNames: ['search:serp:overall', 'search:serp:time_spent:overall'],
      platformFilter: true,
    },
  ];

  const platforms = ['comet_www', 'fblite_android'];

  const finalMetrics = [];
  for (const metric of metrics) {
    const {
      collections,
      filters,
      label,
      platformFilter,
      platformFiltersOnly,
    } = metric;

    if (!platformFiltersOnly) {
      finalMetrics.push(metric);
    }

    if (platformFilter) {
      for (const platform of platforms) {
        const updatedFilters = filters.slice() ?? [];
        updatedFilters.push({
          column: 'interface',
          mode: 1,
          values: [platform],
        });

        const metricWithPlatformFilter = {
          ...metric,
          filters: updatedFilters,
          label: `${label ?? collections[0]} (${platform})`,
        };

        finalMetrics.push(metricWithPlatformFilter);
      }
    }
  }

  for (const {control, experiment, test, type} of experiments) {
    console.log(`Experiment: ${experiment}`);
    for (const {
      collections,
      filters,
      label,
      metricNames,
      platformFilter,
    } of finalMetrics) {
      const config = {
        ads_metric_request: {
          breakdown: null,
          excluded_dates: [],
          filters: [],
          metrics: [],
          remove_blackout: true,
          selected_dates: [],
        },
        blackout_dates: [],
        delta_type: 9999,
        enable_skip_cache: false,
        enable_time_based_join: true,
        expand_exposures_to_cluster: false,
        exposure_filters: [],
        impx_query_service_request: null,
        is_visible: false,
        mdf_collection_names: collections,
        mdf_metric_names: metricNames,
        metric_absolute_end_time:
          Math.floor(Date.parse(endTime) / 1000) + SECONDS_IN_DAYS,
        metric_absolute_start_time:
          Math.floor(Date.parse(endTime) / 1000) +
          SECONDS_IN_DAYS -
          7 * SECONDS_IN_DAYS,
        metric_aggregation: 0,
        metric_column: '',
        metric_filters:
          filters != null
            ? filters.map(filter => {
                return {...filter, type: 0};
              })
            : null,
        metric_group_by_columns: [],
        metric_relative_end_time: '',
        metric_relative_start_time: '',
        metric_table: '',
        metric_type: 0,
        percentiles_to_analyze: [],
        population_filters: [],
        population_group_by_columns: [],
        query_service: 0,
        rollup_type: 9999,
        test_control_pair:
          type === 'qe'
            ? {
                control_group: control,
                experiment,
                framework: 0,
                test_group: test,
                universe: '',
              }
            : {
                control_group: control,
                experiment: test,
                framework: 1,
                test_group: control === 'control' ? 'testing' : 'control',
                universe: experiment,
              },
        use_cluster_level_analysis: false,
        use_clustoid: false,
        use_cross_app: false,
        use_precomp: false,
        use_relative_metric_time: false,
        use_warehouse: false,
        viz_type: 2,
      };
      let url = `https://www.internalfb.com/intern/deltoid3/?serialized_query=${encodeURIComponent(
        JSON.stringify(config),
      )}`;

      if (label != null) {
        url += `&custom_label=${encodeURIComponent(label)}`;
      }

      console.log(
        `${label ?? collections.concat(metricNames ?? []).join(', ')}:`,
        url,
      );
    }
  }
})();
