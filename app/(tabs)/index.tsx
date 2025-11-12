import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-ico-flags';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import countriesData from '@/constants/data.json';

type SizeOption = {
  days: number;
  price: number;
};

type CountryEntry = {
  flagName: string;
  countryName: string;
  size?: Record<string, SizeOption[]>;
};

type CountryOption = {
  code: string;
  name: string;
  flag: string;
  sizes: Record<string, SizeOption[]>;
};

export default function HomeScreen() {
  const countries = useMemo<CountryOption[]>(
    () =>
      Object.entries(countriesData as Record<string, CountryEntry>)
        .map(([code, value]) => ({
          code,
          name: value.countryName,
          flag: value.flagName,
          sizes: value.size ?? {},
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    () => countries[0]?.code ?? ''
  );
  const [selectedSizeKey, setSelectedSizeKey] = useState(() => {
    const firstCountry = countries[0];
    if (!firstCountry) {
      return '';
    }
    const sizeKeys = Object.keys(firstCountry.sizes);
    return sizeKeys[0] ?? '';
  });
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const selectedCountry = useMemo(
    () =>
      countries.find(country => country.code === selectedCountryCode) ??
      countries[0] ??
      null,
    [countries, selectedCountryCode]
  );

  useEffect(() => {
    if (!selectedCountry) {
      setSelectedSizeKey('');
      setSelectedPlanIndex(0);
      return;
    }

    const sizeKeys = Object.keys(selectedCountry.sizes);
    if (sizeKeys.length === 0) {
      setSelectedSizeKey('');
      setSelectedPlanIndex(0);
      return;
    }

    if (!sizeKeys.includes(selectedSizeKey)) {
      setSelectedSizeKey(sizeKeys[0]);
      setSelectedPlanIndex(0);
    }
  }, [selectedCountry, selectedSizeKey]);

  const sizeOptions = useMemo(
    () => (selectedCountry ? Object.keys(selectedCountry.sizes) : []),
    [selectedCountry]
  );

  const plans = useMemo(
    () =>
      selectedCountry && selectedSizeKey
        ? selectedCountry.sizes[selectedSizeKey] ?? []
        : [],
    [selectedCountry, selectedSizeKey]
  );

  useEffect(() => {
    if (plans.length === 0) {
      setSelectedPlanIndex(0);
      return;
    }

    if (selectedPlanIndex >= plans.length) {
      setSelectedPlanIndex(0);
    }
  }, [plans, selectedPlanIndex]);

  const handleCountryChange = useCallback((item: CountryOption) => {
    setSelectedCountryCode(item.code);
    const sizeKeys = Object.keys(item.sizes);
    setSelectedSizeKey(sizeKeys[0] ?? '');
    setSelectedPlanIndex(0);
  }, []);

  const handleSizeSelect = useCallback((sizeKey: string) => {
    setSelectedSizeKey(sizeKey);
    setSelectedPlanIndex(0);
  }, []);

  const handlePlanSelect = useCallback((index: number) => {
    setSelectedPlanIndex(index);
  }, []);

  const renderCountryItem = useCallback(
    (item: CountryOption) => {
      const isActive = item.code === selectedCountryCode;
      return (
        <View style={[styles.dropdownItem, isActive && styles.dropdownItemActive]}>
          <Icon name={item.flag} width={28} height={28} />
          <Text style={styles.dropdownItemLabel}>{item.name}</Text>
        </View>
      );
    },
    [selectedCountryCode]
  );

  const formatSizeLabel = (sizeKey: string) => sizeKey.replace(/\s+/g, '');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/header-image.png')}
          style={styles.headerImage}
        />
      }
    >
      <View>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Select eSIM plan</Text>
          <Text style={styles.pageDescription}>
            Get an eSIM for Japan and enjoy reliable and affordable internet access on your trip.
          </Text>
        </View>
        <View style={styles.countrySelector}>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            data={countries}
            value={selectedCountryCode}
            labelField="name"
            valueField="code"
            placeholder="Select a country"
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            onChange={item => handleCountryChange(item as CountryOption)}
            renderLeftIcon={() =>
              selectedCountry ? (
                <View style={styles.dropdownLeft}>
                  <Icon name={selectedCountry.flag} width={28} height={28} />
                </View>
              ) : null
            }
            renderRightIcon={() => (
              <View style={styles.dropdownRight}>
                <Text style={styles.countryLabel}>Country</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </View>
            )}
            renderItem={renderCountryItem}
            showsVerticalScrollIndicator={false}
            maxHeight={320}
          />
        </View>

        {sizeOptions.length > 0 ? (
          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeList}>
              {sizeOptions.map(sizeKey => {
                const isActive = sizeKey === selectedSizeKey;
                return (
                  <Pressable
                    key={sizeKey}
                    style={[
                      styles.sizeButton,
                      isActive && styles.sizeButtonActive,
                    ]}
                    onPress={() => handleSizeSelect(sizeKey)}
                  >
                    <Text
                      style={[
                        styles.sizeButtonText,
                        isActive && styles.sizeButtonTextActive,
                      ]}
                    >
                      {formatSizeLabel(sizeKey)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No plan sizes available for this country.
            </Text>
          </View>
        )}

        {plans.length > 0 && (
          <View style={styles.planSection}>
            <Text style={styles.sectionTitle}>Price</Text>
            <View style={styles.planList}>
              {plans.map((plan, index) => {
                const isActive = index === selectedPlanIndex;
                return (
                  <Pressable
                    key={`${selectedSizeKey}-${plan.days}-${plan.price}-${index}`}
                    style={[
                      styles.planCard,
                      isActive && styles.planCardActive,
                    ]}
                    onPress={() => handlePlanSelect(index)}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        isActive && styles.radioOuterActive,
                      ]}
                    >
                      {isActive && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.planInfo}>
                      <Text style={styles.planDays}>{plan.days} days</Text>
                      <View style={styles.planSeparator} />
                      <Text style={styles.planPrice}>
                        ${plan.price.toFixed(2)}
                      </Text>
                      <Text style={styles.planCurrency}>USD</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.actionButtons}>
              <Pressable style={[styles.infoButton, styles.infoButtonShadow]}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#475569"
                />
                <Text style={styles.infoButtonText}>
                  All plans have a 30-day activation period.
                </Text>
              </Pressable>

              <Pressable style={[styles.infoButton, styles.infoButtonShadow]}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color="#000000"
                />
                <Text style={styles.infoButtonText}>
                  Check device compatibility
                </Text>
              </Pressable>

              <Pressable style={[styles.checkoutButton, styles.checkoutButtonShadow]}>
                <Text style={styles.checkoutButtonText}>Go to checkout</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#020617',
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
  countrySelector: {
    gap: 12,
  },
  headerImage: {
    height: 260,
    width: '100%',
  },
  dropdown: {
    width: '100%',
    minHeight: 64,
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  dropdownContainer: {
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  dropdownSelectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  dropdownLeft: {
    marginRight: 12,
  },
  dropdownRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemActive: {
    backgroundColor: '#F3F4F6',
  },
  dropdownItemLabel: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  countryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  sizeSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sizeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0F172A',
    marginRight: 12,
    marginBottom: 12,
  },
  sizeButtonActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  sizeButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0F172A',
  },
  sizeButtonTextActive: {
    color: '#fff',
  },
  planSection: {
    marginTop: 24,
  },
  planList: {
    gap: 12,
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  planCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterActive: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  planInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  planDays: {
    fontSize: 16,
    fontWeight: '600',
    color: '#020617',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#020617',
  },
  planSeparator: {
    width: 1,
    height: 16,
    backgroundColor: '#CBD5E1',
  },
  planCurrency: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  infoButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  infoButtonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  infoButtonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButton: {
    width: '100%',
    paddingVertical: 16,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#F9EBD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 8,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  emptyState: {
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
