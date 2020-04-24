package cn.com.hszl.biz.intf;

import java.util.List;

import cn.com.hszl.biz.ds.form.TenantForm;

public interface ITenantService {
   public TenantForm addTenant(TenantForm tenant);
   
   public List<TenantForm> listTenant();
}
