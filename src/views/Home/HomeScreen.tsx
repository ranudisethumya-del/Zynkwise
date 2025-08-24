import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { palette } from '../../theme/colors';
import { useAuthState } from '../../viewmodels/AuthState';
import { useAppStore } from '../../store/appStore';

// Icons
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome5'; // for some familiar names

export default function HomeScreen() {
  const { user } = useAuthState();
  const currency = useAppStore(s => s.currency);

  return (
    <View style={s.screen}>
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        {/* Header (safe spacing from top) */}
        <View style={s.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/60' }}
            style={s.avatar}
          />
          <TouchableOpacity style={s.bell}>
            <MC name="bell-outline" size={18} color={palette.text} />
            <View style={s.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Balance card */}
        <View style={s.balanceCard}>
          <Text style={s.balanceLabel}>Accounting Balance</Text>
          <Text style={s.balanceValue}>{currency} 99,000</Text>

          {/* Progress ring */}
          <View style={s.ringWrap}>
            <View style={s.ringOuter}>
              <View style={s.ringInner}>
                <Text style={s.ringText}>55%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick actions grid */}
        <View style={s.grid}>
          <ActionTile label="E-wallet" icon={<MC name="wallet" size={34} color={palette.primary} />} />
          <ActionTile label="Transactions" icon={<MC name="swap-horizontal" size={34} color={palette.primary} />} />
          <ActionTile label="Goals" icon={<MC name="target" size={34} color={palette.primary} />} />
          <ActionTile label="Payments" icon={<MC name="credit-card-outline" size={34} color={palette.primary} />} />
        </View>

        {/* Recent Transactions */}
        <Text style={s.sectionTitle}>Recent Transactions</Text>

        <TxnRow
          icon={<MC name="cart-outline" size={28} color={palette.primary} />}
          title="Keells"
          subtitle="Groceries"
          amount="-LKR 3,500.00"
        />
        <TxnRow
          icon={<MC name="school-outline" size={28} color={palette.primary} />}
          title="Sarasavi"
          subtitle="Education"
          amount="-LKR 2,000.00"
        />
        <TxnRow
          icon={<MC name="cart-outline" size={28} color={palette.primary} />}
          title="Arpico"
          subtitle="Household"
          amount="-LKR 1,250.00"
        />
        <TxnRow
          icon={<FA name="utensils" size={24} color={palette.primary} />}
          title="Lunch"
          subtitle="Food"
          amount="-LKR 850.00"
        />
        <TxnRow
          icon={<MC name="bus" size={28} color={palette.primary} />}
          title="Bus"
          subtitle="Transport"
          amount="-LKR 120.00"
        />
        <TxnRow
          icon={<MC name="cart-outline" size={28} color={palette.primary} />}
          title="Food City"
          subtitle="Groceries"
          amount="-LKR 2,340.00"
        />
      </ScrollView>

      {/* Bottom navigation bar (UI only for now) */}
      <View style={s.bottomBar}>
        <BottomItem label="Home" active icon={<MC name="home-variant" size={22} />} />
        <BottomItem label="Zynk Assist" icon={<MC name="chat-processing-outline" size={22} />} />
        <BottomItem label="Reports" icon={<MC name="chart-line" size={22} />} />
        <BottomItem label="Profile" icon={<MC name="account-circle-outline" size={22} />} />
      </View>
    </View>
  );
}

function ActionTile({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <TouchableOpacity style={s.tile}>
      <View style={s.tileIcon}>{icon}</View>
      <Text style={s.tileLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function TxnRow({
  icon,
  title,
  subtitle,
  amount,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  amount: string;
}) {
  return (
    <View style={s.txnRow}>
      <View style={s.txnIcon}>{icon}</View>
      <View style={s.txnTextWrap}>
        <Text style={s.txnTitle}>{title}</Text>
        <Text style={s.txnSubtitle}>{subtitle}</Text>
      </View>
      <Text style={s.txnAmount}>{amount}</Text>
    </View>
  );
}

function BottomItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={s.bottomItem}>
      <View style={[s.bottomIconWrap, active && s.bottomIconActive]}>
        {icon}
      </View>
      <Text style={[s.bottomLabel, active && s.bottomLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: { flex: 1 },
  content: {
    paddingTop: 24, // safe spacing from top
    paddingHorizontal: 20,
    paddingBottom: 24 + 72, // space for bottom bar
  },

  // Header
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.card,
  },
  bell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.warning,
    position: 'absolute',
    top: 6,
    right: 6,
  },

  // Balance Card
  balanceCard: {
    backgroundColor: palette.primary, // vivid Zynkwise green (#08AB63)
    borderRadius: 18,
    padding: 22,
    marginTop: 10,
    marginBottom: 18,
    minHeight: 120,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceLabel: {
    color: '#DDF9EC',
    fontSize: 12,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  ringWrap: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  ringOuter: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 6,
    borderColor: '#ffffff66', // neutral contrast
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    color: palette.primary,
    fontWeight: '800',
  },

  // Tiles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tile: {
    width: '48%',
    backgroundColor: palette.card,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tileIcon: {
    width: 36,
    height: 36,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    color: palette.text,
    fontWeight: '600',
  },

  // Transactions
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  txnIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: palette.primary + '20', // soft brand tint
  },
  txnTextWrap: { flex: 1 },
  txnTitle: {
    fontWeight: '600',
    color: palette.text,
  },
  txnSubtitle: {
    color: palette.subtext,
    fontSize: 12,
    marginTop: 2,
  },
  txnAmount: {
    color: '#111827',
    fontWeight: '600',
  },

  // Bottom bar (UI only)
  bottomBar: {
    height: 64,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 6,
  },
  bottomItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconWrap: {
    width: 24,
    height: 24,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconActive: {
    tintColor: palette.primary,
  },
  bottomLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  bottomLabelActive: {
    color: palette.primary,
    fontWeight: '700',
  },
});
