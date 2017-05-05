# MeiZuFingerprint
-keep class com.fingerprints.service.** { *; }

# Preserve some attributes that may be required for reflection.
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod

# SmsungFingerprint
-keep class com.samsung.android.sdk.** { *; }
